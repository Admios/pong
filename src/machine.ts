import BoundingBox from "./boundingBox";
import Point from "./point";
import { paddleFromEdgeDistance, dimensions, colors, fonts } from "./constants";
import Context from "./context";
import Ball from "./ball";
import Player from "./player";

const pickRandomNemesis = () => {
  const nemeses = ["skynet", "voldemort", "dr. doom"];
  return nemeses[Math.floor(Math.random() * nemeses.length)];
};

export default class Machine extends BoundingBox {
  player: Player;
  private uncertainty: number;
  constructor(context: Context) {
    const { width } = dimensions.paddle;
    const { height: contextHeight } = context;
    const paddleHeight = .25 * contextHeight;

    super(
      context,
      new Point(paddleFromEdgeDistance, 0.5 * (contextHeight - paddleHeight)),
      width,
      paddleHeight
    );

    this.player = new Player(pickRandomNemesis(), 0.25);
    this.uncertainty = 0;
  }

  get color() {
    return colors.opponent;
  }

  move({ bounds: { top, bottom, left }, speed }: Ball) {
    const ballHeight = bottom - top;
    const ballMovingAway = speed.x < 0;
    const ballRebounded = left > this.bounds.right;

    if (ballMovingAway) {
      if (!this.uncertainty) {
        const confusionDistance = 0.5 * this.height + 1.5 * ballHeight;
        const [max, min] = [confusionDistance, -confusionDistance];
        this.uncertainty = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    } else if (ballRebounded) {
      this.uncertainty = Math.max(1, this.uncertainty * 0.9) - 1;
    }

    this.origin.y = Math.max(
      -0.5 * this.height,
      Math.min(
        top - this.uncertainty - 0.5 * this.height,
        this.context.height - 0.5 * this.height
      )
    );

    return this;
  }
}
