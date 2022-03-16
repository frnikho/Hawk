import React from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://146.59.236.69:4001";

export const socket = socketIOClient(ENDPOINT);
export const SocketContext = React.createContext(undefined);