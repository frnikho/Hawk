const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const getApiAndEmit = "TODO";

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});