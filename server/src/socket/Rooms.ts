import * as io from 'socket.io';
import RoomManager from "../managers/RoomManager";
import User from "../data/User";
import Room from "../data/Room";

export default class Rooms {

    private io: io.Server;
    private manager: RoomManager;

    constructor(io: io.Server) {
        this.io = io;
        this.manager = new RoomManager();
    }

    public initializeRoutes(): void {
        this.io.on("room:create", this.createRoom);
        this.io.on("room:join", this.joinRoom);
    }

    public initializeSocketRoute(socket: io.Socket): void {
        socket.on("room:create", (data) => this.createRoom(socket, data));
        socket.on("room:join", (data) => this.joinRoom(socket, data));
        socket.on("room:leave", (data) => this.leaveRoom(socket, data));
        socket.on("room:delete", (data) => this.deleteRoom(socket, data));
        socket.on("room:info:get", (data) => this.getRoomInformation(socket, data));
        socket.on("room:game:start", (data) => this.startRoom(socket, data));
    }

    private startRoom(socket: io.Socket, data: JSON) {
        try {
            let room: Room = this.manager.getRoomByCode(data['roomCode']);

            room.start();
            this.io.to(room.code).emit('room:started');
            console.log(room.code);
            /*this.io.emit(room.code, room);*/
        } catch (ex: any) {
            console.log(ex);
            return this.roomCannotBeStarted(socket, "Cannot started room.");
        }
    }

    private createRoom(socket: io.Socket, data: JSON) {
        try {
            let user: User = new User(data['username'], socket.id);
            let room: Room = new Room();
            room.addUser(user);
            if (this.manager.addRoom(room)) {
                socket.join(room.code);
                return this.roomCreated(socket, room);
            } else {
                return this.roomCannotBeCreated(socket, "Cannot created room, please try again later !");
            }
        } catch (ex: any) {
            return this.roomCannotBeCreated(socket, ex.message);
        }
    }

    private getRoomInformation(socket: io.Socket, data: JSON) {
        try {
            let room = this.manager.getRoomByCode(data['roomCode']);
            socket.emit("room:info", room);
        } catch (ex) {

        }
    }

    private roomCreated(socket: io.Socket, room: Room): void {
        socket.emit("room:create:success", {success: true, room});
    }

    private roomJoined(socket: io.Socket, room: Room): void {
        socket.emit("room:join:success", {success: true, room});
    }

    private roomCannotBeCreated(socket: io.Socket, message: string): void {
        socket.emit("room:create:error", {
            message
        })
    }

    private roomCannotBeJoined(socket: io.Socket, message: string): void {
        socket.emit("room:join:error", {
            message
        })
    }

    private roomCannotBeStarted(socket: io.Socket, message: string): void {
        socket.emit('room:start:error', {
            message
        })
    }

    private joinRoom(socket: io.Socket, data: JSON) {
        try {
            if (data['username'] === undefined || data['roomCode'] === undefined)
                return this.roomCannotBeJoined(socket, "required username and room code data !");
            if (this.manager.checkRoomExistsByCode(data['roomCode'])) {
                let room = this.manager.getRoomByCode(data['roomCode']);
                room.addUser(new User(data['username'], socket.id));
                this.io.emit(room.code, room);  // EMIT UPDATE TO ROOM CLIENT
                socket.join(room.code); // JOIN SOCKETIO ROOM
                return this.roomJoined(socket, room);
            } else {
                return this.roomCannotBeJoined(socket, "Invalid room code !");
            }
        } catch (ex) {
            return this.roomCannotBeJoined(socket, "An error occurred, please try again later");
        }
    }

    private leaveRoom(socket: io.Socket, data: JSON) {
        let room = this.manager.getRoomByUserSocket(socket.id);
        this.manager.removeUserBySocketId(socket.id);
        this.io.emit(room.code, room);
    }

    private deleteRoom(socket: io.Socket, data: JSON) {
        //TODO delete room
    }

}