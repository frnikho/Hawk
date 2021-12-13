const short = require('short-uuid');
const roomManager = require("../../managers/RoomManager");
const User = require("../../data/User");

module.exports = (io, socket) => {
    const createRoom = (data) => {
        let code = short.generate();
        if (data.creatorUsername === undefined)
            return cannotCreateRoom("Username cannot be empty !");
        roomManager.addRoom(code, new User(data.creatorUsername, socket.id), (room) => {
            console.log(room);
            socket.join(code);
        })
        roomCreated(code, "Room created !");
    }

    const joinRoom = (data) => {
        if (data === undefined || data.code === undefined || io.sockets.adapter.rooms[data.code] === undefined)
            return cannotJoinRoom("Cannot join room, invalid room code !");
        socket.join(data.code);
        socket.in(data.code).emit("room:update", {
        });
        return roomJoined(data.code, "Room joined !");
    }

    const roomCreated = (code, message) => {
        socket.emit("room:success:create", {code, message})
    }

    const roomJoined = (code, message) => {
        socket.emit("room:success:join", {code, message})
    }

    const cannotCreateRoom = (message) => {
        socket.emit("room:error:create", {error: message});
    }

    const cannotJoinRoom = (message) => {
        socket.emit("room:error:join", {error: message});
    }

    socket.on("room:create", createRoom);
    socket.on("room:join", joinRoom);
}


