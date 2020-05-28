import Ball from "./ball";
import Court from "./court";
import Context from "./context";
import Human from "./human";
import Machine from "./machine";
import Score from "./score";
import Level from "./level";
import Message from "./message";
import { messages, levelUpThreshold } from "./constants";
import Player from "./player";

export default class Game {
  private ball: Ball;
  private court: Court;
  private human: Human;
  private machine: Machine;
  private context: Context;
  private scores: Score[];
  private level: Level;
  private paused: boolean = true;
  private worldClock: number = 0;
  message: Message;

  constructor(context: Context) {
    this.context = context;

    this.court = new Court(context).render();
    this.ball = new Ball(context);
    this.human = new Human(context).render();
    this.machine = new Machine(context).render();
    this.message = new Message(context).render(messages.intro);
    this.scores = [
      new Score(context, this.human.player),
      new Score(context, this.machine.player),
    ];
    this.level = new Level(context);
    this.context.onClick(() => {
      this.worldClock = 0;
      this.paused = !this.paused;
    });

    this.update();
  }

  update() {
    const update = (elapsed: number) => {
      if (!this.paused) {
        if (this.worldClock) {
          this.collide();
          this.animate((elapsed - this.worldClock) / 1000);
        }
        this.worldClock = elapsed;
      }
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  animate(delta: number) {
    this.court.render();
    this.ball.move(delta, this.level.difficulty).render();
    this.human.render();
    this.machine.move(this.ball).render();
    this.scores.forEach((_) => _.render());
    this.level.render();
  }

  collide() {
    const { top, right, bottom, left } = this.ball.bounds;
    const { height, width } = this.context;

    if (
      this.human.overlaps(this.ball) ||
      this.machine.overlaps(this.ball) ||
      right > width ||
      left < 0
    ) {
      this.ball.bounceX();
    }

    if (top < 0 || bottom > height) {
      this.ball.bounceY();
    }

    if (right > width) {
      this.score(this.machine.player);
    }

    if (left < 0) {
      this.score(this.human.player);
    }
  }

  score(player: Player) {
    player.updateScore();

    if (player.score % levelUpThreshold === 0) {
      this.level.up();
    }
  }
}
