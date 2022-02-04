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
            return new Question(data['title'], data['answers'], data['image_url'], data['answer'], data['difficulty']);
        } catch (ex) {
            return undefined;
        }
    }

    public getTitle(): string {
        return this._title;
    }

    public toJSON(): object {
        return {
            title: this._title,
            answers: this._answers,
            imageUrl: this._imageUrl,
        }

    }
}
