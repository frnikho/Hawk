import {Express} from "express";

const express = require('express');
const dotenv = require('dotenv');
import http = require("http");
import Game from "./socket/Game";
const cors = require('cors');
const DEFAULT_PORT = 4001;

class App {

    private port: number;
    private game: Game;
    private readonly server: http.Server;
    private readonly app: Express;

    constructor() {
        this.initConfig();
        this.port =  Number.parseInt(process.env.PORT) || DEFAULT_PORT;
        this.app = express();
        this.server = http.createServer(this.app);
        this.loadMiddlewares();
        this.game = new Game(this.server);
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
}

const app: App = new App();
app.start();