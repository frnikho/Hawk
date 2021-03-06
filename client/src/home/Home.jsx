import React from "react";
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Avatar, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';
import theme from '../theme'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {SocketContext} from "../context/SocketContext";
import {Navigate} from "react-router-dom";
import ParticlesBg from 'particles-bg'

class Home extends React.Component {

    static contextType = SocketContext;

    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            redirectToLobby: false,
            lobbyId: undefined,
            openDialog: false,
            roomCode: undefined
        }
        this.onClickJoinRoom = this.onClickJoinRoom.bind(this);
        this.onClickCreateRoom = this.onClickCreateRoom.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.joinRoom = this.joinRoom.bind(this);
    }

    componentDidMount() {
        let socket = this.context
        console.log("home mounted");
        socket.on("room:create:error", msg => {
            console.log(msg);
        })
        socket.on("room:join:error", msg => {
            console.log(msg);
        })
        socket.on("room:create:success", data => {
            this.setState({lobbyId: data.room.code, redirectToLobby: true});
        })
        socket.on("room:join:success", data => {
            this.setState({lobbyId: data.room.code, redirectToLobby: true});
        })
    }

    componentWillUnmount() {
        let socket = this.context
        socket.off("room:create:error");
        socket.off("room:create:success");
        socket.off("room:error:join");
        socket.off("room:success:join");
    }

    onClickCreateRoom() {
        let socket = this.context
        console.log("CLICKED CREATE");
        if (this.state.username === undefined) {
            alert("Please enter a username");
            return;
        }
        socket.emit("room:create", {username: this.state.username});
    }

    onClickJoinRoom() {
       /* let socket = this.context
        socket.emit("room:join", {username: this.state.username});*/
        this.setState({
            openDialog: true
        })
    }

    redirectToLobby() {
        if (this.state.redirectToLobby === true) {
            return (<Navigate to={`/lobby/${this.state.lobbyId}`}/>)
        }
    }

    joinRoom() {
        let socket = this.context;
        socket.emit("room:join", {username: this.state.username, roomCode: this.state.roomCode});
    }

    handleCloseDialog() {
        this.setState({
            openDialog: false
        })
    }

    showDialog() {
        return (
            <Dialog open={this.state.openDialog} onClose={this.handleCloseDialog}>
                <DialogTitle>Join a room</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="username"
                        type="email"
                        variant="standard"
                        onChange={(event) => this.setState({username: event.currentTarget.value})}
                    />
                    <TextField
                        margin="dense"
                        id="roomCode"
                        fullWidth
                        label="Room code"
                        type="text"
                        variant="standard"
                        onChange={(event) => this.setState({roomCode: event.currentTarget.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCloseDialog}>Close</Button>
                    <Button onClick={this.joinRoom}>Join</Button>
                </DialogActions>
            </Dialog>
        )
    }

    render() {
        return (
            <div>
                {this.redirectToLobby()}
                {this.showDialog()}
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <ParticlesBg type="circle" bg={true} />
                        <CssBaseline/>
                        <Box sx={{ marginTop: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: "center"}}>
                            <Paper sx={{borderRadius: 9, p: 8}} >
                                <Typography variant="h3" sx={{mt: 4}}>
                                    Play
                                </Typography>
                                <Box component="form" onSubmit={(event) => {
                                    event.preventDefault();
                                    this.onClickCreateRoom();
                                }} sx={{mt: 3, mx: 3, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <TextField autoComplete="given-name" name="firstName" required id="firstName" label="Pseudo" autoFocus variant="standard" onChange={(e) => {
                                        e.preventDefault();
                                        this.setState({username: e.target.value});
                                    }}/>
                                    <Box sx={{marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <Button onClick={this.onClickCreateRoom} fullWidth variant="contained" color="secondary" sx={{ mt: 2, mb: 2 }}>
                                            Create room
                                        </Button>
                                        <Button onClick={this.onClickJoinRoom} fullWidth variant="contained" color="success" sx={{ mt: 1, mb: 2 }}>
                                            Join room
                                        </Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default Home;
