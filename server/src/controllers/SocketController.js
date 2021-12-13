const Room = require("../managers/RoomManager");
const User = require("../data/User");
const rooms = [];

const DEFAULT_LIFE = 3;
const MAX_ROOM_PLAYERS = 20;

const controlSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected");
        onCreateRoom(socket);
        onJoinRoom(socket);
        onDisconnect(socket);
    });
}

const onJoinRoom = (socket) => {
    socket.on("join_room", (data) => {
        let correct = 0;
        rooms.forEach((room, index) => {
            if (room.id === data.id) {
                rooms[index].addUser(new User(socket.id, data.username, DEFAULT_LIFE));
                correct = 1;
                return;
            }
        })
        if (!correct)
            socket.emit("room_error", {
                message: "Wrong room id !"
            });
    });
}

const onCreateRoom = (socket) => {
    socket.on("create_room", (data) => {
        let room = new Room(data.code);
        room.addUser(new User(socket.id, data.username, DEFAULT_LIFE));
        rooms.push(room);

        socket.emit("room_created", {
            message: "room created !",
            code: data.code,
        });
    });
}

const onDisconnect = (socket) => {
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        rooms.forEach((room, index) => {
            if (room.hasUserWithSocketId(socket.id)) {
                if (room.countUser() <= 0) {
                    rooms.slice(index, 1);
                }
            }
        })
    });
}

module.exports = {controlSocket}