import * as io from 'socket.io';

export default class User {

    private readonly _username: string;
    private readonly _socket: io.Socket;
    private readonly _socketId: string;

    constructor(username: string, socket: io.Socket) {
        if (username === undefined || socket === undefined)
            throw new TypeError("Username or socket cannot be null !");
        this._username = username;
        this._socket = socket;
        this._socketId = this._socket.id;
    }

    get username(): string {
        return this.username;
    }

    get socket(): io.Socket {
        return this._socket;
    }

    public toJSON(): object {
        return {
            username: this._username,
            socketId: this._socketId
        }
    }
}