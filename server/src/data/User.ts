export default class User {

    private _username: string;
    private _socketId: string;

    constructor(username: string, socketId: string) {
        if (username === undefined || socketId === undefined)
            throw new TypeError("Username or socketId cannot be null !");
        this._username = username;
        this._socketId = socketId;
    }

    get username(): string {
        return this.username;
    }

    get socketId(): string {
        return this._socketId;
    }
}