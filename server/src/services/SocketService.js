const {createRoom, joinRoom} = require("../controllers/sockets/RoomSocketController")(io);
const onConnection = (socket) => {
    socket.on("room:create", createRoom);

    socket.on("room:join", joinRoom);
}

module.exports = {onConnection}