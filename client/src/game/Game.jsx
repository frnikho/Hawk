import React from "react";
import { SocketContext } from "../context/SocketContext";
import Container from "@mui/material/Container";
import {Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import AnswerCardComponent from "../components/AnswerCardComponent";
import UserCardComponent from "../components/UserCardComponent";
import GameStart from "./GameStart";
import withRouter from "../components/withRouter";
import {Navigate} from "react-router-dom";
import Box from "@mui/material/Box";
import podiumAnimation from '../animations/podium.json';
import Lottie from "lottie-react";

class Game extends React.Component {
  static contextType = SocketContext;

    constructor(props) {
        super(props);
        this.state = {
            players: undefined,
            question: undefined,
            state: undefined,
            podium: undefined,
            countdown: 0,
            answered: undefined,
            goodAnswer: undefined,
            redirect: false,
            redirectUrl: undefined,
        }
        this.onClickAnswerCard = this.onClickAnswerCard.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onUpdateUsers = this.onUpdateUsers.bind(this);
        this.onEndQuestions = this.onEndQuestions.bind(this);
        this.onNewQuestion = this.onNewQuestion.bind(this);
        this.onPodium = this.onPodium.bind(this);
        this.onGameError = this.onGameError.bind(this);
    }

    componentDidMount() {
        this.socket = this.context;
        this.socket.on('game:update', this.onUpdate);
        this.socket.on('game:update:users', this.onUpdateUsers)
        this.socket.on('game:endQuestions', this.onEndQuestions)
        this.socket.on('game:newQuestion', this.onNewQuestion);
        this.socket.on('game:podium', this.onPodium)
    }

    onGameError() {
        this.setState({
            redirect: true,
            redirectUrl: "/",
        });
    }

    onEndQuestions(data) {
        console.log("End questions ");
        this.setState({
            goodAnswer: data,
        })
        console.log('good: ', data);
    }

    onNewQuestion() {
        this.setState({
            goodAnswer: undefined,
        })
    }

    onPodium(data) {
        this.setState({
            podium: data,
        })
        console.log(data);
    }

    onUpdateUsers(data) {

    }

    onUpdate(data) {
        this.setState({
            question: data.question,
            countdown: data.countdown,
            state: data.state,
            players: data.players,
        });
    }

    onClickAnswerCard(answer, index) {
        const data = {
            answer,
            index
        }
        this.socket.emit('game:answer', data);
        this.setState({
            answered: index,
        })
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
        return (
            <Grid container spacing={6} alignContent={"center"} textAlign={"center"}>
                {abc.map((answer, index) => <AnswerCardComponent answered={this.state.answered} goodAnswer={index === this.state.goodAnswer} key={index} answer={answer} onClick={() => this.onClickAnswerCard(answer, index)}/>)}
            </Grid>
        )
    }

    showHeaders() {
        let data = [];
        if (this.state.question !== undefined)
            data.push(<h1 key={0}>{this.state.question.title}</h1>);
        if (this.state.countdown !== undefined) {
            data.push(<h3 key={1}>{this.state.countdown}</h3>)
            console.log(this.state.state);
        }
        if (this.state.question.imageUrl !== undefined)
            data.push(<img style={{maxHeight: 200}} src={"http://localhost:4001/public/" + this.state.question.imageUrl} alt={"Image link"}/>)
        return data;
    }

    showPodium() {
        if (this.state.podium === undefined || this.state.state !== 3)
            return;

        let content;
        if (this.state.podium.length === 0) {
            content = (
                <Box>
                    <Typography fontSize={26}>
                        <b>Draw</b>
                    </Typography>
                    <Typography fontSize={20}>
                        no winners !
                    </Typography>
                </Box>
            )
        } else {
            content = this.state.podium.map((user) => {
                    return (
                        <ListItemButton>
                            <ListItemText>{user.client.username} - {user.client.life} Remaining</ListItemText>
                        </ListItemButton>
                    )
                })
        }

        return (
            <Box sx={{ width: '100%', maxWidth: 360}}>
                <Lottie animationData={podiumAnimation} loop={false} autoplay={true}/>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item md={12} textAlign={"center"}>
                            <List>
                                <ListItem disablePadding>
                                    {content}
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Container>
            </Box>);

    }

    showApp() {
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

    render() {
        if (this.state.state === undefined || this.state.state === 0)
            return (
                <>
                    {this.state.redirect ? <Navigate to={this.state.redirectUrl}/> : null}
                    <GameStart countdown={this.state.countdown}/>
                </>)

        if (this.state.state === 3) {
            return this.showPodium();
        } else {
            return this.showApp();
        }
    }
}

export default withRouter(Game);
