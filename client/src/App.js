import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import MainPage from "./MainPage";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {

export default class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" exact element={<Home/>}/>
                        <Route path="/lobby/:code" exact element={<Lobby/>}/>
                    </Routes>
                </Router>
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
