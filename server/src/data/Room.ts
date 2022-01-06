import User from "./User";
import * as short from 'short-uuid';
import QuestionManager from "../managers/QuestionManager";
const {getAllQuestions} = require('../repository/QuestionRepository')

const MAX_USERS: number = 10;

export default class Room {

    private _code: short.SUUID;
    private _users: User[];
    private _maxUsers = MAX_USERS;
    private _questionManager: QuestionManager;

    constructor() {
        this._code = short.generate();
        this._users = [];
        this._questionManager = new QuestionManager();
    }

    public addUser(user: User): void {
        if (this.userAlreadyExists(user))
            throw new Error("User is already in this room");
            this._users.push(user);
            this.start();
    }

    public userAlreadyExists(user: User): boolean {
        for (let u of this._users) {
            if (u.socketId === user.socketId)
                return true;
        }
        return false;
    }

    public start(): void {
        getAllQuestions((data) => {
            this._questionManager.addQuestionsFromQuery(data);
        });
    }

    get users(): User[] {
        return this._users;
    }

    get code(): short.SUUID {
        return this._code;
    }

    get maxUsers(): number {
        return this._maxUsers;
    }
}