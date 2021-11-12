const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 4001;
const index = require("./routes/index");
const {controlSocket} = require("./controllers/SocketController");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = new socketIo.Server(server, {
    cors: {
        origin: '*'
    }
});

controlSocket(io);



server.listen(port, () => console.log(`Listening on port ${port}`));