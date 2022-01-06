import Question from "../data/Question";

export default class QuestionManager {

    private _questions: Question[];
    private _currentQuestionsIndex: number;

    constructor() {
        this._questions = [];
        this._currentQuestionsIndex = 0;
    }

    public addQuestion(question: Question): boolean {
        try {
            this._questions.push(question);
        } catch (ex: any) {
            return false;
        }
        return true;
    }

    public getQuestionByIndex(index: number): Question | undefined {
        if (index < 0 || index >= this._questions.length)
            return undefined;
        return this._questions[index];
    }

    public getCurrentQuestion(): Question | undefined {
        return this.getQuestionByIndex(this._currentQuestionsIndex);
    }

    public nextQuestion(): boolean {
        if (this._currentQuestionsIndex + 1 >= this._questions.length)
            return false;
        this._currentQuestionsIndex++;
        return true;
    }

    public getQuestions(): Question[] {
        return this._questions;
    }
}