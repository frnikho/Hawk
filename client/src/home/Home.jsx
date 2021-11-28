import React from "react";
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Avatar, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import theme from '../theme'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {SocketContext} from "../context/SocketContext";
import {Navigate} from "react-router-dom";

class Home extends React.Component {

    static contextType = SocketContext

    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            redirectToLobby: false,
            lobbyId: undefined
        }
        this.onClickJoinRoom = this.onClickJoinRoom.bind(this);
        this.onClickCreateRoom = this.onClickCreateRoom.bind(this);
    }

    componentDidMount() {
        let socket = this.context
        console.log("home mounted");
        socket.on("room:error:create", msg => {
            console.log(msg);
        })
        socket.on("room:success:create", data => {
            this.setState({lobbyId: data.code, redirectToLobby: true});
        })
        socket.on("room:error:join", msg => {
            console.log(msg);
        })
        socket.on("room:success:join", msg => {
            console.log(msg);
        })
    }

    onClickCreateRoom() {
        let socket = this.context
        console.log("CLICKED CREATE");
        socket.emit("room:create", {abc: "def"});
    }

    onClickJoinRoom() {
        let socket = this.context
        socket.emit("room:join", {abc: "def"});
    }

    redirectToLobby() {
        if (this.state.redirectToLobby === true) {
            return (<Navigate to={`/lobby/${this.state.lobbyId}`}/>)
        }
    }

    render() {
        return (
            <div>
                {this.redirectToLobby()}
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <Box sx={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#2e86de'}}>
                            <Avatar sx={{ m:2, bgcolor: '#ff6b6b', width: 100, height: 100}}>
                                <PersonIcon/>
                            </Avatar>
                            <Typography variant="h3">
                                Play
                            </Typography>
                            <Box component="form" sx={{m: 3, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <TextField autoComplete="given-name" name="firstName" required id="firstName" label="Pseudo" autoFocus variant="standard" onChange={(e) => {
                                        e.preventDefault();
                                        this.setState({username: e.target.value});
                                    }}/>
                                <Box sx={{marginTop: 1,display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <Button onClick={this.onClickCreateRoom} fullWidth variant="contained" color="secondary" sx={{ mt: 2, mb: 2 }}>
                                        Create room
                                    </Button>
                                    <Button onClick={this.onClickJoinRoom} fullWidth variant="contained" color="success" sx={{ mt: 1, mb: 2 }}>
                                        Join room
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default Home;