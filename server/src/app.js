const express = require("express");
const http = require("http");

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const roomSocketController = require('./controllers/sockets/RoomSocketController.js');

const app = express();
app.use(index);

const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
});


const onConnection = (socket) => {
    socket.on("disconnect", onDisconnect);
    console.log("New connection: " + socket.id);
    roomSocketController(io, socket);
}

const onDisconnect = (socket) => {
    console.log("Disconnected");
}

io.on("connection", onConnection);



server.listen(port, () => console.log(`Listening on port ${port}`));