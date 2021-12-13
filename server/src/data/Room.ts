import User from "./User";
import * as short from 'short-uuid';

const MAX_USERS: number = 10;

export default class Room {

    private _code: short.SUUID;
    private _users: User[];
    private _maxUsers = MAX_USERS;

    constructor() {
        this._code = short.generate();
        this._users = [];
    }

    public addUser(user: User): void {
        if (this.userAlreadyExists(user))
            throw new Error("User is already in this room");
        this._users.push(user);
    }

    public userAlreadyExists(user: User): boolean {
        for (let u of this._users) {
            if (u.socketId === user.socketId)
                return true;
        }
        return false;
    }

    get users(): User[] {
        return this._users;
    }

    get code(): short.SUUID {
        return this._code;
    }

    get maxUsers(): number {
        return this._maxUsers;
    }
}