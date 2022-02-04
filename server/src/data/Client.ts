import * as io from 'socket.io';

export default class Client {

    private readonly _username: string;
    private readonly _socket: io.Socket;

    constructor(username: string, socket: io.Socket) {
        if (username === undefined || socket === undefined)
            throw new TypeError("Username or socket cannot be null !");
        this._username = username;
        this._socket = socket;
    }

    public getUsername() {
        return this._username;
    }

    public getSocket() {
        return this._socket;
    }

    public toJSON() {
        return {
            username: this._username,
            socketId: this._socket.id
        }
    }
}
