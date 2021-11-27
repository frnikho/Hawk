const short = require('short-uuid');

module.exports = (io, socket) => {
    const createRoom = (data) => {
        let code = short.generate();
        socket.join(code);
        return roomCreated(code, "Room created !");
    }

    const joinRoom = (data) => {
        if (data === undefined || data.code === undefined || io.sockets.adapter.rooms[data.code] === undefined)
            return cannotJoinRoom("Cannot join room !");
        socket.join(data.code);
        return roomJoined(data.code, "Room joined !");
    }

    const roomCreated = (code, message) => {
        socket.emit("room:success:create", {code, message})
    }

    const roomJoined = (code, message) => {
        socket.emit("room:success:join", {code, message})
    }

    const cannotCreateRoom = (message) => {
        socket.emit("room:error:create", message);
    }

    const cannotJoinRoom = (message) => {
        socket.emit("room:error:join", message);
    }

    socket.on("room:create", createRoom);
    socket.on("room:join", joinRoom);
}


