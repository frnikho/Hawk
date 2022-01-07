import Room from "./Room";
import QuestionManager from "../managers/QuestionManager";
import {getAllQuestions, getRandomQuestions} from "../repository/QuestionRepository";
import Question from "./Question";

export enum GameState {
    STARTING,
    ANSWER_TIME,
    RESPONSE_TIME,
    PODIUM,
}

const STARTING_COUNTDOWN: number = 30;
const ANSWER_COUNTDOWN: number = 15;
const RESPONSE_COUNTDOWN: number = 10;

export default class Game {

    private countdownTimer: number;
    private countdown: NodeJS.Timer;
    private gameState: GameState;
    private questions: QuestionManager;
    private room: Room;

    constructor(room: Room) {
        this.room = room;
        this.countdownTimer = STARTING_COUNTDOWN;
        this.gameState = GameState.STARTING;
        this.questions = new QuestionManager();
        this.fetchQuestions();
    }

    private fetchQuestions(): void {
        getRandomQuestions(20, (questions: Question[]) => {
            questions.forEach((question) => this.questions.addQuestion(question));
        });
    }
    public sendGameUpdateToEveryone() {
        this.room.users.forEach((user) => this.sendGameUpdate(user.socket));
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
        }
        let question: Question | undefined = Question.fromJSON(this.questions.getCurrentQuestion());
        if (question instanceof Question) {
            console.log(typeof question);
            data['question'] = question.toJSON();
        }
        socket.emit('game:update', data);
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

            this.gameState = GameState.ANSWER_TIME;
            this.countdownTimer = ANSWER_COUNTDOWN;
        }
    }

    private podiumState() {

    }
}