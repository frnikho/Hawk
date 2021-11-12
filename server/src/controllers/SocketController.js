const controlSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected");

        socket.on("test", () => {
            socket.emit("test", "Hello World");
        })

        onJoinRoom(socket);
        onDisconnect(socket);
    });
}

const onJoinRoom = (socket) => {
    socket.on("join_room", (data) => {
        socket.join(data.code);
        socket.in(data.code).emit("message", `You are in room: ${data.code}`);
    });
}

const onDisconnect = (socket) => {
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
}

module.exports = {controlSocket}