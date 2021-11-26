module.exports = class User {
    constructor(socketId, username, defaultLife) {
        this.socketId = socketId;
        this.username = username;
        this.defaultLife = defaultLife;
    }
}