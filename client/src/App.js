import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import MainPage from "./MainPage";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {

  const [response, setResponse] = useState("");

  useEffect((props) => {
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
  });

  return (
      <MainPage/>
  );
}

export default App;
