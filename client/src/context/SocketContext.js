import React from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";

export const socket = socketIOClient(ENDPOINT);
export const SocketContext = React.createContext(undefined);