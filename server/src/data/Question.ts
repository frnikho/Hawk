export default class Question {

    private readonly _title: string;
    private readonly _answers: string[];
    private readonly _goodAnswer: number
    private readonly _imageUrl: string;
    private readonly _difficulty: number;

    constructor(title: string, answers: string[], imageUrl: string, goodAnswer?: number, difficulty?: number) {
        this._title = title;
        this._answers = answers;
        this._goodAnswer = goodAnswer;
        this._imageUrl = imageUrl;
        this._difficulty = difficulty;
    }

    static fromJSON(data: object): Question | undefined {
        try {
            return new Question(data['title'], data['answers'], data['image_url']);
        } catch (ex) {
            return undefined;
        }
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

    public toJSON(): object {
        return {
            title: this._title,
            answers: this._answers,
            imageUrl: this._imageUrl,
        }

    }
}