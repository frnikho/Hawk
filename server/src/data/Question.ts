export default class Question {

    private _title: string;
    private _answers: string[];
    private _goodAnswer: number
    private _imageUrl: string;
    private _difficulty: number;

    constructor(title: string, answers: string[], goodAnswer: number, imageUrl: string, difficulty: number) {
        this._title = title;
        this._answers = answers;
        this._goodAnswer = goodAnswer;
        this._imageUrl = imageUrl;
        this._difficulty = difficulty;
    }

    get title(): string {
        return this._title;
    }

    get answers(): string[] {
        return this._answers;
    }

    get goodAnswer(): number {
        return this._goodAnswer;
    }

    get imageUrl(): string {
        return this._imageUrl;
    }

    get difficulty(): number {
        return this._difficulty;
    }
}