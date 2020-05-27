export default class Player {
  private _score: number = 0;
  name: string;
  screenOffsetFactor: number;

  constructor(name: string, screenOffsetFactor: number) {
    this.screenOffsetFactor = screenOffsetFactor;
    this.name = name;
  }
  get score() {
    return this._score;
  }

  updateScore() {
    this._score++;
  }

  toString() {
    return `${this.name}: ${this._score}`;
  }
}
