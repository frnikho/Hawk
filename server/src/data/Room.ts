import Client from "./Client";
import * as short from 'short-uuid';
import Game from "./Game";

const MAX_USERS: number = 10;

export default class Room {

    private _code: short.SUUID;
    private _users: Client[];
    private _game: Game;

    constructor() {
        this._code = short.generate();
        this._users = [];
    }

    public addUser(user: Client): void {
        if (this.userAlreadyExists(user))
            throw new Error("Client is already in this room");
            this._users.push(user);
    }

    public userAlreadyExists(user: Client): boolean {
        this._users.some((u)=>u.socket.id === user.socket.id);


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

    get users(): Client[] {
        return this._users;
    }

    get code(): short.SUUID {
        return this._code;
    }

    public toJSON(): object {
        return {
            code: this._code,
            users: this._users.map((user) => user.toJSON()),
            game: this._game
        }
    }
}
