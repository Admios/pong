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
  private confusion: number;
  constructor(context: Context) {
    const { height, width } = dimensions.paddle;
    const { height: contextHeight } = context;

    super(
      context,
      new Point(paddleFromEdgeDistance, 0.5 * (contextHeight - height)),
      width,
      height
    );

    this.player = new Player(pickRandomNemesis(), 0.25);
    this.confusion = 0;
  }

  get color() {
    return colors.opponent;
  }

  move({ bounds: { top, bottom, left }, speed }: Ball) {
    const ballHeight = bottom - top;
    const ballMovingAway = speed.x < 0;

    if (ballMovingAway) {
      if (!this.confusion) {
        const confusionDistance = 0.5 * this.height + ballHeight;
        const [max, min] = [confusionDistance, -confusionDistance];
        this.confusion = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    } else if (left > this.bounds.right) {
      this.confusion = Math.max(1, this.confusion * 0.9) - 1;
    }

    this.origin.y = Math.max(
      -0.5 * this.height,
      Math.min(top - this.confusion, this.context.height - 0.5 * this.height)
    );

    return this;
  }
}
