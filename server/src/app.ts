import {Express} from "express";

const express = require('express');
const dotenv = require('dotenv');
import http = require("http");
import * as io from 'socket.io';
import RoomSocket from "./socket/RoomSocket";
import RoomManager from "./managers/RoomManager";
const cors = require('cors');
const DEFAULT_PORT = 4001;

export default class App {

    private port: number;
    private readonly io: io.Server;
    private static roomSocket: RoomSocket;
    private readonly server: http.Server;
    private readonly app: Express;

    constructor() {
        this.initConfig();
        this.port =  Number.parseInt(process.env.PORT) || DEFAULT_PORT;
        this.app = express();
        this.server = http.createServer(this.app);
        this.loadMiddlewares();
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: "*"
            }
        })
        App.roomSocket = new RoomSocket(this.io);
        this.initializeSocketRoute();
        this.initializeRoute();
    }

    public initializeSocketRoute() {
        this.io.on("connection", this.onConnection);
    }

    public initializeRoute() {
        this.app.use('/public', express.static('public'))
    }

    private onConnection(socket: io.Socket) {
        App.roomSocket.initializeSocketRoute(socket);
    }

    private initConfig(): void {
        dotenv.config();
    }

    private loadMiddlewares(): void {
        this.app.use(cors())
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`server is listening on ${this.port}`);
        })
    }

    public setPort(port: number): void {
        this.port = port;
    }

    public getPort(): number {
        return this.port;
    }

    public stop(): void {

    }

    public static getRoomManager(): RoomManager {
        return App.roomSocket.roomManager;
    }
}

const app: App = new App();
app.start();
