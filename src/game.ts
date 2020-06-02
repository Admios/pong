import Ball from "./ball";
import Court from "./court";
import Context from "./context";
import Human from "./human";
import Machine from "./machine";
import Score from "./score";
import Level from "./level";
import Message from "./message";
import {
  messages,
  scoreToLevelUp,
  hitsToLevelUp,
  maxDifficulty,
} from "./constants";
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
  private message: Message;
  private playAgain: boolean;

  constructor(context: Context) {
    this.context = context;

    this.context.onPauseOrResume(() => {
      this.worldClock = 0;
      this.paused = !this.paused;
      if (this.playAgain) this.initialize();
    });

    this.initialize();
    this.message = new Message(context).render(messages.intro);

    this.update();
  }

  initialize() {
    this.court = new Court(this.context).render();
    this.ball = new Ball(this.context);
    this.human = new Human(this.context).render();
    this.machine = new Machine(this.context).render();
    this.scores = [
      new Score(this.context, this.human.player),
      new Score(this.context, this.machine.player),
    ];
    this.level = new Level(this.context);
    this.playAgain = false;
  }

  update() {
    const update = (elapsed: number) => {
      if (!this.paused) {
        if (this.worldClock) {
          this.collide();
          this.animate((elapsed - this.worldClock) / 1000);
          this.checkGameOver();
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
      if (this.ball.totalHits % hitsToLevelUp === 0) {
        this.level.up();
      }
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

  checkGameOver() {
    if (this.level.difficulty >= maxDifficulty) {
      this.paused = true;
      this.playAgain = true;

      const [winner] = [this.human, this.machine].sort(
        (a, b) => b.player.score - a.player.score
      );
      this.message.render([
        "Game Over!!!",
        `${winner.player.name} has triumphed`,
        "click to play again.",
      ]);
    }
  }

  score(player: Player) {
    player.updateScore();

    if (player.score % scoreToLevelUp === 0) {
      this.level.up();
    }
  }

  pause() {
    this.worldClock = 0;
    this.paused = true;
  }
}
