import React from "react";
import withRouter from "../components/withRouter";
import {AppBar, Grid, IconButton, ListItem, Paper, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {SocketContext} from "../context/SocketContext";
import {Navigate} from "react-router-dom";
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';

class Lobby extends React.Component {

    static contextType = SocketContext;

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            redirectUrl: undefined,
            room: undefined,
        }
        this.startGame = this.startGame.bind(this);
    }

    componentDidMount() {
        let socket = this.context;

        socket.on(`${this.props.params.code}`, (data) => {
            this.setState({room: data});
            console.log("BD", data);
        })

        socket.on(`room:info`, (data) => {
            this.setState({room: data});
            console.log("INFO", data);
        })

        socket.on(`room:info:error`, () => {
            this.setState({
                redirect: true,
                redirectUrl: '/',
            });
        })

        socket.on('room:started', () => {
            this.setState({
                redirect: true,
                redirectUrl: '/game/' + this.props.params.code,
            })
        });

        socket.emit("room:info:get", {roomCode: this.props.params.code});
    }

    componentWillUnmount() {
        let socket = this.context;
        socket.off("room:info");
    }

    onClickLeaveRoom = () => {
        let socket = this.context
        socket.emit("room:leave");
        this.setState({
            redirect: true,
            redirectUrl: '/'
        })
    }

    showUsers = () => {
        if (this.state.room === undefined || this.state.room?.users === undefined)
            return;
        return (
            this.state.room.users.map((user, index) => {
                return (<Grid key={index} xs={3} item>
                    <Box sx={{m: 2}}>
                        <Paper sx={{p: 2}} elevation={10}>
                            <PersonIcon/>
                            <Typography fontWeight={"700"} fontSize={22}>{index === 0 ? "👑" : null} {user.username}</Typography>
                        </Paper>
                     </Box>
                </Grid>)
            })
        )
    }

    startGame = () => {
        let socket = this.context;

        console.log(this.state.room);
        if (this.state.room.users.length > 1) {
            socket.emit('room:game:start', {
                roomCode: this.props.params.code
            });
        } else {
            alert('required more players to start');
        }
    }

    showControls = () => {
        if (this.state.room === undefined || this.state.room.users === undefined)
            return;
        let socket = this.context;

        console.log(this.state.room.users[0].socketId);
        console.log(socket.id);

        console.log(this.state.room.users[0]);

        if (this.state.room.users[0].socketId === socket.id)
            return <Button variant={"outlined"} onClick={this.startGame}>Start</Button>
    }

    render() {
        return (
            <div>
                <AppBar style={{ background: 'transparent', boxShadow: 'none'}} position="static">
                    {this.state.redirect ? <Navigate to={this.state.redirectUrl}/> : null}
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}>
                        </IconButton>
                        <Typography fontSize={20} sx={{ flexGrow: 1 }} color="common.black">
                            Room code: <b>{this.props.params.code}</b>
                        </Typography>
                        {this.showControls()}
                        <Button sx={{m: 2}} onClick={this.onClickLeaveRoom} variant={"outlined"} color={"error"}>Leave room</Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{mx: 2, my: 2}}>
                    <Typography fontSize={20}>
                        <b>Rules:</b>
                        <br/>
                        <ListItem>
                            - All players begin with 3 lifes and need to choose the good answer for each questions
                        </ListItem>
                        <ListItem>
                            - you loose a life if you choose the wrong answer
                        </ListItem>
                        <ListItem>
                            - the main goal is to be the last player alive
                        </ListItem>
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={{mx: 2, mb: 1}} fontSize={22}><b>Online players:</b></Typography>
                    <Grid container spacing={2} alignItems={"center"} textAlign={"center"}>
                        {this.showUsers()}
                    </Grid>
                </Box>
            </div>
        );
    }
}



export default withRouter(Lobby);
