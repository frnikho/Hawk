import Room from "../data/Room";

export default class RoomManager {

    private static _rooms: Room[];

    constructor() {
        RoomManager._rooms = [];
    }

    public addRoom(room: Room): boolean {
        try {
            RoomManager._rooms.push(room);
        } catch (ex: any) {
            return false;
        }
        return true;
    }

    public removeRoom(room: Room) {
        try {
            let index: number = RoomManager._rooms.findIndex((r) => r.code === room.code);
            if (index !== -1)
                RoomManager._rooms.splice(index, 1);
        } catch (ex) {
            console.log(ex);
        }
    }

    public removeUserBySocketId(socketId: string): void {
        for (let room of RoomManager._rooms) {
            for (let i = 0; i < room.users.length; i++) {
                if (room.users[i].socket.id === socketId) {
                    room.users.splice(i, 1);
                    return;
                }
            }
        }
    }

    public checkRoomExists(room: Room): boolean {
        for (let r of RoomManager._rooms) {
            if (r.code === room.code)
                return true;
        }
        return false;
    }
    public checkRoomExistsByCode(code: string): boolean {
        if (code === undefined)
            return false;
        for (let r of RoomManager._rooms) {
            if (r.code === code)
                return true;
        }
        return false;
    }

    public getRoomByUserSocket(socketId: string): Room[] | undefined {
        return RoomManager._rooms.filter((room)=>room.users.find((user)=>user.socket.id === socketId));
    }

    public getRoomByCode(code: string): Room | undefined {
        for (let room of RoomManager._rooms) {
            if (room.code === code)
                return room;
        }
        return undefined;
    }

}
