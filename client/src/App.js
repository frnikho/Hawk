import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./home";
import {Lobby} from "./lobby";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:4001";
// const socket = socketIOClient(ENDPOINT);

class App extends React.Component {
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

export default App;
