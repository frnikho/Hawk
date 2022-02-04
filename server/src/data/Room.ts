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

    public removeUser(user: Client): void {
        let index = this._users.findIndex((u) => u.getSocket().id === user.getSocket().id);
        if (index !== -1)
            this._users.splice(index, 1);
    }

    public userAlreadyExists(user: Client): boolean {
        this._users.some((u)=>u.getSocket().id === user.getSocket().id);


        for (let u of this._users) {
            if (u.getSocket().id === user.getSocket().id)
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

    public getGame(): Game {
        return this._game;
    }

    public getUser(): Client[] {
        return this._users;
    }

    public getCode(): string {
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
