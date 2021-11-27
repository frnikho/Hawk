import React from "react";
import {Router} from "@mui/icons-material";
import {Route, Routes} from "react-router-dom";
import {Home} from "./home";
import {Lobby} from "./lobby";

import socketIOClient from "socket.io-client";
import SocketContext from "./components/SocketContext";

const ENDPOINT = "http://127.0.0.1:4001";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: undefined
        }
    }

    componentDidMount() {
        this.setState({socket: socketIOClient(ENDPOINT)})
    }

    render() {
        return (
            <div className="App">
                <SocketContext.Provider value={this.state.socket}>
                    <Router>
                        <Routes>
                            <Route path="/" exact element={<Home/>}/>
                            <Route path="/lobby/:code" exact element={<Lobby/>}/>
                        </Routes>
                    </Router>
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
