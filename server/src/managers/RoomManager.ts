import Room from "../data/Room";

export default class RoomManager {

    private _rooms: Room[];

    constructor() {
        this._rooms = [];
    }

    public addRoom(room: Room): boolean {
        try {
            this._rooms.push(room);
        } catch (ex: any) {
            return false;
        }
        return true;
    }
    
    public removeUserBySocketId(socketId: string): void {
        for (let room of this._rooms) {
            for (let i = 0; i < room.users.length; i++) {
                if (room.users[i].socketId === socketId) {
                    room.users.splice(i, 1);
                    return;
                }
            }
        }
    }

    public checkRoomExists(room: Room): boolean {
        for (let r of this._rooms) {
            if (r.code === room.code)
                return true;
        }
        return false;
    }
    public checkRoomExistsByCode(code: string): boolean {
        if (code === undefined)
            return false;
        for (let r of this._rooms) {
            if (r.code === code)
                return true;
        }
        return false;
    }

    public getRoomByUserSocket(socketId: string): Room | undefined {
        for (let room of this._rooms) {
            for (let user of room.users) {
                if (user.socketId === socketId)
                    return room;
            }
        }
        return undefined;
    }

    public getRoomByCode(code: string): Room | undefined {
        for (let room of this._rooms) {
            if (room.code === code)
                return room;
        }
        return undefined;
    }

}