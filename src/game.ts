import Ball from "./ball";
import Court from "./court";
import Context from "./context";
import Human from "./human";
import Machine from "./machine";
import Score from "./score";
import Level from "./difficulty";

export default class Game {
  private ball: Ball;
  private court: Court;
  private human: Human;
  private machine: Machine;
  private context: Context;
  private scores: Score[];
  private level: Level;

  constructor(context: Context) {
    this.context = context;

    this.court = new Court(context);
    this.ball = new Ball(context);
    this.human = new Human(context);
    this.machine = new Machine(context);
    this.scores = [
      new Score(context, this.human.player),
      new Score(context, this.machine.player),
    ];
    this.level = new Level(context);

    this.render();
  }

  render() {
    let lastUpdate: number = 0;
    const update = (elapsed: number) => {
      if (lastUpdate) {
        this.collide();
        this.animate((elapsed - lastUpdate) / 1000);
      }
      lastUpdate = elapsed;
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  collide() {
    const { top, right, bottom, left } = this.ball.bounds;
    const { height, width } = this.context;

    if (
      this.human.overlaps(this.ball) ||
      this.machine.overlaps(this.ball) ||
      right > width || //for a fun squash mode
      left < 0
    ) {
      this.ball.bounceX();
    }

    if (top < 0 || bottom > height) {
      this.ball.bounceY();
    }

    if (right > width) {
      this.machine.player.updateScore();
    }

    if (left < 0) {
      this.human.player.updateScore();
    }
  }

  animate(delta: number) {
    this.court.render();
    this.ball.move(delta).render();
    this.human.render();
    this.machine.move(this.ball).render();
    this.scores.forEach(_ => _.render());
    this.level.render();
  }
}
