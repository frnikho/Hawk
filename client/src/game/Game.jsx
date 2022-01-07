import React from "react";
import {SocketContext} from "../context/SocketContext";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import AnswerCardComponent from "../components/AnswerCardComponent";
import UserCardComponent from "../components/UserCardComponent";

class Game extends React.Component {

    static contextType = SocketContext;

    constructor(props) {
        super(props);
        this.state = {
            users: undefined,
            answers: undefined,
            questions: undefined
        }
        this.onClickAnswerCard = this.onClickAnswerCard.bind(this);
    }

    componentDidMount() {
        this.socket = this.context;
        //MOCK
        this.setState({
            answers: [
                {
                    title: "1"
                },
                {
                    title: "2"
                },
                {
                    title: "3"
                },
                {
                    title: "4"
                },
            ],
            users: [
                {
                    username: "JustUN",
                    life: 3,
                },
                {
                    username: "Nico le bg",
                    life: 3
                },
                {
                    username: "LePirateVictor",
                    life: 2,
                },
                {
                    username: "Le Baptman",
                    life: 1,
                },
                {
                    username: "Cacahuet alias pepito",
                    life: 3,
                },
                {
                    username: "Bar man",
                    life: 2,
                },
            ]
        })

        this.socket.on('game:update', this.onUpdate);
        this.socket.emit('game:update:get', {hello: "world"});
    }

    onUpdate(data) {
        console.log(data);
    }

    onClickAnswerCard(answer) {
        console.log(answer);
        this.socket.emit('game:answer');
    }

    showUsers() {
        if (this.state.users === undefined)
            return;

        return (
            <Grid container spacing={2}>
                {this.state.users.map((user, index) => <UserCardComponent key={index} user={user}/>)}
            </Grid>
        )
    }

    showAnswersCard() {
        if (this.state.answers === undefined)
            return;

        return (
            <Grid container spacing={6} alignContent={"center"} textAlign={"center"}>
                {this.state.answers.map((answer) => <AnswerCardComponent answer={answer} onClick={this.onClickAnswerCard}/>)}
            </Grid>
        )
    }

    render() {
        return (
            <Container>
                <Grid container spacing={2}>
                    <Grid item md={12} textAlign={"center"}>
                        <h1>Question title</h1>
                    </Grid>
                </Grid>
                {this.showAnswersCard()}
                {this.showUsers()}
            </Container>
        );
    }
}

export default Game;