import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { Lobby } from "./lobby";

import { SocketContext, socket } from "./context/SocketContext";
import { Game } from "./game";
import {Navigate} from "react-router-dom";
import NotFoundPage from './404/NotFoundPage'


export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        <SocketContext.Provider value={socket}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lobby/:code" exact element={<Lobby />} />
            <Route path="/game/:code" exact element={<Game />} />
            <Route path="/404" component={NotFoundPage} />
            <Navigate to="/404" />
          </Routes>
        </SocketContext.Provider>
      </div>
    );
  }
}

/*

const socket = socketIOClient(ENDPOINT);

    socket.on("room:error:join", (msg) => {
      console.log(msg);
    })

    socket.on("room:success:create", (msg) => {
      console.log(msg);
    });

    socket.on("room:error:create", (msg) => {
      console.log(msg);
      setResponse(msg);
    })

    socket.on("room:success:join", (msg) => {
      console.log(msg);
    });

    socket.emit("room:create");

    socket.on("message", data => {
      setResponse(data);
    })
 */
