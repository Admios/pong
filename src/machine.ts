import BoundingBox from "./boundingBox";
import Point from "./point";
import { paddleFromEdgeDistance, dimensions, colors, fonts } from "./constants";
import Context from "./context";
import Ball from "./ball";
import Player from "./player";

const pickRandomNemesis = () => {
  const nemeses = ["skynet", "voldemort", "dr. doom"];
  return nemeses[Math.floor(Math.random() * (nemeses.length))];
};

export default class Machine extends BoundingBox {
  player: Player;
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
  }

  get color() {
    return colors.opponent;
  }

  move({ bounds: { top, bottom } }: Ball) {
    const ballHeight = top - bottom;
    this.origin.y = Math.max(
      0,
      Math.min(
        top - 0.5 * (this.height + ballHeight),
        this.context.height - this.height
      )
    );

    return this;
  }
}
