import * as io from 'socket.io';
import RoomManager from "../managers/RoomManager";
import Client from "../data/Client";
import Room from "../data/Room";
import Game from "../data/Game";

export class RoomException extends Error {

    private readonly _socket: io.Socket;

    constructor(msg: string, socket: io.Socket) {
        super(msg);
        this._socket = socket;
    }

    get getSocket(): io.Socket {
        return this._socket;
    };

}

export default class RoomSocket {

    private io: io.Server;
    private manager: RoomManager;

    constructor(io: io.Server) {
        this.io = io;
        this.manager = new RoomManager();
    }

    get roomManager(): RoomManager {
        return this.manager;
    }

    public initializeSocketRoute(socket: io.Socket): void {
        try {
            socket.on("room:create", (data) => this.createRoom(socket, data));
            socket.on("room:join", (data) => this.joinRoom(socket, data));
            socket.on("room:leave", (data) => this.leaveRoom(socket, data));
            socket.on("room:delete", (data) => this.deleteRoom(socket, data));
            socket.on("room:info:get", (data) => this.getRoomInformation(socket, data));
            socket.on("room:game:start", (data) => this.startRoom(socket, data));
            socket.on("disconnect", (data) => this.onDisconnect(socket, data));
        } catch (error) {
            console.log(error);
            if (error instanceof RoomException) {
                error.getSocket.emit('room:error', error.message);
            }
        }
    }

    private onDisconnect(socket, data) {
        let room = this.manager.getRoomByUserSocket(socket.id)[0];
        if (room !== undefined) {
            let client: Client = room.users.find((user) => user.socket.id === socket.id);
            room.getGame().onUserDisconnected(client);
            room.removeUser(client);
            if (room.users.length <= 0)
                room.removeUser(client);
            else
                console.log(room.users.length);
        }
    }

    private startRoom(socket: io.Socket, data: JSON) {
        try {
            let room: Room = this.manager.getRoomByCode(data['roomCode']);
            room.setGame(new Game(room));
            this.io.to(room.code).emit('room:started');
            room.start();
        } catch (ex: any) {
            console.log(ex);
            throw new RoomException("Cannot started room !", socket);
        }
    }

    private createRoom(socket: io.Socket, data: JSON) {
        let user: Client = new Client(data['username'], socket);
        let room: Room = new Room();
        room.addUser(user);
        if (this.manager.addRoom(room)) {
            socket.join(room.code);
            return this.roomCreated(socket, room);
        } else {
            throw new RoomException("Cannot created room, please try again later !", socket);
        }
    }

    private getRoomInformation(socket: io.Socket, data: JSON) {
        try {
            let room = this.manager.getRoomByCode(data['roomCode']);
            socket.emit("room:info", room);
        } catch (ex) {
            throw new RoomException("Cannot get room information !", socket);
        }
    }

    private roomCreated(socket: io.Socket, room: Room): void {
        socket.emit("room:create:success", {success: true, room: room.toJSON()});
    }

    private roomJoined(socket: io.Socket, room: Room): void {
        socket.emit("room:join:success", {success: true, room: room.toJSON()});
    }

    private roomJoinError(socket: io.Socket, msg: string): void {
        socket.emit("room:join:error", {success: false, msg})
    }

    private joinRoom(socket: io.Socket, data: JSON) {
        if (data['username'] === undefined || data['roomCode'] === undefined) {
            return this.roomJoinError(socket, "Invalid room code !");
        } else if (this.manager.checkRoomExistsByCode(data['roomCode'])) {
            let room = this.manager.getRoomByCode(data['roomCode']);
            room.addUser(new Client(data['username'], socket));
            this.io.emit(room.code, room);  // EMIT UPDATE TO ROOM CLIENT
            socket.join(room.code); // JOIN SOCKETIO ROOM
            return this.roomJoined(socket, room);
        } else {
            return this.roomJoinError(socket, "Invalid room code !");
        }
    }

    private leaveRoom(socket: io.Socket, data: JSON) {
        let room = this.manager.getRoomByUserSocket(socket.id);
        if (room.length <= 0)
            return;
        this.manager.removeUserBySocketId(socket.id);
        this.io.emit(room[0].code, room);
    }

    private deleteRoom(socket: io.Socket, data: JSON) {
        //TODO delete room
    }

}
