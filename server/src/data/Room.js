module.exports = class Room {

    constructor(roomId) {
        this.roomId = roomId;
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    hasUser(user) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i] === user)
                return true;
        }
        return false;
    }

    hasUserWithSocketId(socketId) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].socketId === socketId)
                return true;
        }
        return false;
    }

    getMasterUser() {
        return this.users[0];
    }

    getAllUser() {
        return this.users;
    }

    countUser() {
        return this.users.length;
    }

    getRoomId() {
        return this.roomId;
    }

    removeUser(user) {
        //TODO
    }



}