import {React, useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./home";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {

  const [response, setResponse] = useState("");

  useEffect((props) => {
    const socket = socketIOClient(ENDPOINT);

    socket.emit("join_room", {
      code: "79AB"
    });

    socket.on("message", data => {
      setResponse(data);
    })
  });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
