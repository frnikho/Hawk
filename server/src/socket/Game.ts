import * as http from 'http';
import * as io from 'socket.io';
import Rooms from "./Rooms";
import {raw} from "express";

export default class Game {

    private readonly io: io.Server;
    private roomManager: Rooms;

    constructor(httpServer: http.Server) {
        this.io = require('socket.io')(httpServer, {
            cors: {
                origin: "*"
            }
        })
        this.roomManager = new Rooms(this.io);
        this.initializeSocketRoute();
    }

    private initializeSocketRoute() {
        this.io.on("connection", this.onConnection.bind(this));
    }

    private onConnection(socket: io.Socket) {
        console.log("Connection");
        this.roomManager.initializeSocketRoute(socket);
    }

    private onDisconnection() {

    }



}