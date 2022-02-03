import React from "react";
import withRouter from "../components/withRouter";
import {AppBar, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {SocketContext} from "../context/SocketContext";
import {Navigate} from "react-router-dom";
import Box from "@mui/material/Box";

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

        socket.on(`room:info:error`, (data) => {
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
                return (<Grid item key={index}>
                    <h1 key={index}>{user.username}</h1>
                </Grid>)
            })
        )
    }

    startGame = () => {
        let socket = this.context;
        console.log("ABCD");
        socket.emit('room:game:start', {
            roomCode: this.props.params.code
        });
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

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="common.black">
                            <h1>Room code: {this.props.params.code}</h1>
                        </Typography>
                        <Button onClick={this.onClickLeaveRoom} variant={"outlined"} color={"error"}>Leave room</Button>
                    </Toolbar>
                </AppBar>
                <Box>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {this.showUsers()}
                    </Grid>
                    {this.showControls()}
                </Box>
            </div>
        );
    }
}



export default withRouter(Lobby);