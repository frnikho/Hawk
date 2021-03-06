import Question from "../data/Question";

export default class QuestionManager {

    private readonly _questions: Question[];
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

    public addQuestionsFromQuery(query): void {
        try {
            query.forEach((element) => {
                let question: Question = new Question(element.title, element.answers, element.answer, element.image_url, element.difficulty);

                console.log(question);

                this.addQuestion(question);
            })
        } catch (e: any) {
            throw new Error(e);
        }
    }

    public getQuestionByIndex(index: number): Question | undefined {
        if (index < 0 || index >= this._questions.length)
            return undefined;
        return this._questions[index];
    }

    public getCurrentQuestion(): Question | undefined {
        return this._questions[this._currentQuestionsIndex];
    }

    public nextQuestion(): Question | undefined {
        if (this._currentQuestionsIndex + 1 >= this._questions.length)
            return undefined;
        this._currentQuestionsIndex++;
        return this._questions[this._currentQuestionsIndex];
    }

    public getQuestions(): Question[] {
        return this._questions;
    }

    public isQuestionsLoaded(): boolean {
        return (this._questions.length > 0 ? true : false);
    }
}