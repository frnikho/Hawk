import Room from "./Room";
import QuestionManager from "../managers/QuestionManager";
import {getRandomQuestions} from "../repository/QuestionRepository";
import Question from "./Question";
import Player from "./Player";
import Client from "./Client";

export enum GameState {
    STARTING,
    ANSWER_TIME,
    RESPONSE_TIME,
    PODIUM,
}

const STARTING_COUNTDOWN: number = 5;
const ANSWER_COUNTDOWN: number = 10;
const RESPONSE_COUNTDOWN: number = 3;

export default class Game {

    private countdownTimer: number;
    private countdown: NodeJS.Timer;

    private gameState: GameState;
    private questions: QuestionManager;

    private room: Room;
    private players: Player[] = [];

    constructor(room: Room) {
        this.room = room;
        this.countdownTimer = STARTING_COUNTDOWN;
        this.gameState = GameState.STARTING;
        this.questions = new QuestionManager();
        for (let user of this.room.users) {
            let player: Player = {client: user, life: 3, isAnswered: false};
            this.players.push(player);
        }
        this.initUserGameSocket();
        this.fetchQuestions();
    }

    private initUserGameSocket() {
        this.room.users.forEach((user) => {
            user.socket.on("disconnect", () => {

            });
            user.socket.on("game:answer", (data) => {
               console.log(data);
               this.onUserAnswered(user.socket, data);
            });
        });
    }

    public onUserDisconnected(user: Client) {
        let index = this.players.findIndex((player) => player.client.socket.id === user.socket.id);
        if (index == -1)
            return;
        this.players.splice(index, 1);
        this.sendGameUpdateToEveryone();
    }

    private onUserAnswered(socket, data) {
        this.players.forEach((player) => {
            if (player.client.socket.id === socket.id) {
                if (player.life <= 0)
                    return;
                player.userAnswer = data;
                player.isAnswered = true;
                this.sendGameUsersUpdateToEveryone();
                return;
            }
        });
    }

    private fetchQuestions(): void {
        getRandomQuestions(20, (questions: Question[]) => {
            questions.forEach((question) => this.questions.addQuestion(question));
        });
    }

    public sendGameUpdateToEveryone() {
        this.room.users.forEach((user) => this.sendGameUpdate(user.socket));
    }

    public sendGameUsersUpdateToEveryone() {
        this.room.users.forEach((user) => this.sendGameUserUpdate(user.socket));
    }

    public start(): void {
        this.room.users.forEach((user) => this.sendGameUpdate(user.socket));

        this.countdown = setInterval(() => {
            this.gameLoop();
            this.sendGameUpdateToEveryone();
        },1000);

    }

    private sendGameUpdate(socket) {
        let data: object = {
            countdown: this.countdownTimer,
            state: this.gameState,
            players: this.players,
        };
        let question: Question | undefined = Question.fromJSON(this.questions.getCurrentQuestion());
        if (question instanceof Question) {
            data['question'] = question.toJSON();
        }
        socket.emit('game:update', data);
    }

    private sendGameUserUpdate(socket) {
        let data = {
            answeredUsers: this.players.map((user) => user.client.socket.id)
        }
        socket.emit('game:update:users', data);
    }

    private gameLoop() {
        if (this.gameState === GameState.STARTING) {
            this.startingState();
        } else if (this.gameState === GameState.ANSWER_TIME) {
            this.answerState();
        } else if (this.gameState === GameState.RESPONSE_TIME) {
            this.responseState();
        }
        this.countdownTimer--;
    }

    private startingState() {
        if (this.countdownTimer === 0) {
            this.gameState = GameState.ANSWER_TIME;
            this.countdownTimer = ANSWER_COUNTDOWN;
        }
    }

    private answerState() {
        if (this.countdownTimer === 0) {
            this.gameState = GameState.RESPONSE_TIME;
            this.countdownTimer = RESPONSE_COUNTDOWN;
            this.players.forEach((user) => {
                if (user.userAnswer === undefined || (user.userAnswer['index'] !== this.questions.getCurrentQuestion()['answer'])) {
                    if (user.life > 0)
                        user.life--;
                }
                user.client.socket.emit('game:endQuestions', this.questions.getCurrentQuestion()['answer']);
            });
            //this.checkWin();
        }
    }

    private checkWin() {
        let usersLeft: number = 0;
        this.players.map((player) => {
           if (player.life > 0)
               usersLeft++;
        });
        if (usersLeft <= 1) {
            this.gameState = GameState.PODIUM;
            clearInterval(this.countdown);
            this.onPodiumState();
        }
    }

    private responseState() {
        if (this.countdownTimer === 0) {
            //TODO CHECK WINNER OR NOT, IF NOT, GET A NEW QUESTIONS
            this.players.forEach((user) => {
                user.client.socket.emit('game:newQuestion');
            });
            this.players.map((user) => user.isAnswered = false);
            if (this.questions.nextQuestion() === undefined) {
                this.gameState = GameState.PODIUM;
            } else {
                this.gameState = GameState.ANSWER_TIME;
            }
            this.countdownTimer = ANSWER_COUNTDOWN;
        }
    }

    private onPodiumState() {
        console.log("END GAME !");
    }
}

