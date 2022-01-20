import Room from "./Room";
import QuestionManager from "../managers/QuestionManager";
import {getRandomQuestions} from "../repository/QuestionRepository";
import Question from "./Question";
import Player from "./Player";

export enum GameState {
    STARTING,
    ANSWER_TIME,
    RESPONSE_TIME,
    PODIUM,
}

const STARTING_COUNTDOWN: number = 5;
const ANSWER_COUNTDOWN: number = 15;
const RESPONSE_COUNTDOWN: number = 10;

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
           user.socket.on("game:answer", (data) => {
               console.log(data);
               this.onUserAnswered(user.socket, data);
           });
        });
    }

    private onUserAnswered(socket, data) {

        this.players.forEach((player) => {
            if (player.client.socket.id === socket.id) {
                player.userAnswer = data;
                player.isAnswered = true;
                this.sendGameUsersUpdateToEveryone();
                return;
            }
        })
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
        } else if (this.gameState === GameState.PODIUM) {
            this.podiumState();
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
        }
    }

    private responseState() {
        if (this.countdownTimer === 0) {
            //TODO CHECK WINNER OR NOT, IF NOT, GET A NEW QUESTIONS
            this.players.map((user) => user.isAnswered = false);
            this.questions.nextQuestion();
            this.gameState = GameState.ANSWER_TIME;
            this.countdownTimer = ANSWER_COUNTDOWN;
        }
    }

    private podiumState() {

    }
}

