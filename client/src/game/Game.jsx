import React from "react";
import {SocketContext} from "../context/SocketContext";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import AnswerCardComponent from "../components/AnswerCardComponent";
import UserCardComponent from "../components/UserCardComponent";
import GameStart from "./GameStart";

class Game extends React.Component {

    static contextType = SocketContext;

    constructor(props) {
        super(props);
        this.state = {
            players: undefined,
            question: undefined,
            state: undefined,
            countdown: 0
        }
        this.onClickAnswerCard = this.onClickAnswerCard.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentDidMount() {
        this.socket = this.context;
        this.socket.on('game:update', this.onUpdate);
        this.socket.emit('game:update:get', {hello: "world"});
    }

    onUpdate(data) {
        this.setState({
            question: data.question,
            countdown: data.countdown,
            state: data.state,
            players: data.players
        });
    }

    onClickAnswerCard(answer) {
        console.log(answer);
        this.socket.emit('game:answer');
    }

    showUsers() {
        if (this.state.players === undefined)
            return;

        return (
            <Grid container spacing={2}>
                {this.state.players.map((player, index) => <UserCardComponent key={index} player={player}/>)}
            </Grid>
        )
    }

    showAnswersCard() {
        if (this.state.question === undefined || this.state.question.answers === undefined)
            return;

        let abc = JSON.parse(this.state.question.answers);
        console.log(abc);

        return (
            <Grid container spacing={6} alignContent={"center"} textAlign={"center"}>
                {abc.map((answer) => <AnswerCardComponent answer={answer} onClick={this.onClickAnswerCard}/>)}
            </Grid>
        )
    }

    showHeaders() {
        let data = [];
        if (this.state.question !== undefined)
            data.push(<h1>{this.state.question.title}</h1>);
        if (this.state.countdown !== undefined)
            data.push(<h3>{this.state.countdown}</h3>)
        return data;
    }

    render() {
        if (this.state.state === undefined || this.state.state === 0)
            return <GameStart countdown={this.state.countdown}/>
        return (
            <Container>
                <Grid container spacing={2}>
                    <Grid item md={12} textAlign={"center"}>
                        {this.showHeaders()}
                    </Grid>
                </Grid>
                {this.showAnswersCard()}
                {this.showUsers()}
            </Container>
        );
    }
}

export default Game;