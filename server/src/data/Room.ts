import User from "./User";
import * as short from 'short-uuid';
import Game from "./Game";

const MAX_USERS: number = 10;

export default class Room {

    private _code: short.SUUID;
    private _users: User[];
    private _maxUsers = MAX_USERS;
    private _game: Game;

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
            if (u.socket.id === user.socket.id)
                return true;
        }
        return false;
    }

    public start(): void {
        this._game.start();
    }

    public setGame(game: Game): void {
        this._game = game;
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

    public toJSON(): object {
        return {
            code: this._code,
            users: this._users.map((user) => user.toJSON()),
            game: this._game

        }
    }
}