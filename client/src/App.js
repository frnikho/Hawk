import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import MainPage from "./MainPage";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {

  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.emit("join_room", {
      code: "79AB"
    });

    socket.on("message", data => {
      setResponse(data);
    })
  });

  return (
      <MainPage/>
  );
}

export default App;
