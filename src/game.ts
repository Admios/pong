import Ball from "./ball";
import Court from "./court";
import Context from "./context";
import Player from "./player";
import Opponent from "./opponent";

export default class Game {
  private ball: Ball;
  private court: Court;
  private player: Player;
  private opponent: Opponent;

  constructor(context: Context) {

    this.court = new Court(context);
    this.ball = new Ball(context);
    this.player = new Player(context);
    this.opponent = new Opponent(context);

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
    if (this.player.overlaps(this.ball) || this.opponent.overlaps(this.ball)) {
      this.ball.bounce();
    }
  }

  animate(delta: number) {
    this.court.render();
    this.ball.move(delta).render();
    this.player.render();
    this.opponent.move(this.ball).render();
  }
}
