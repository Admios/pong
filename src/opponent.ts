import BoundingBox from "./boundingBox";
import Point from "./point";
import { paddleFromEdgeDistance, dimensions, colors } from "./constants";
import Context from "./context";
import Ball from "./ball";

export default class Opponent extends BoundingBox {
  constructor(context: Context) {
    const { height, width } = dimensions.paddle;
    const { height: contextHeight } = context;

    super(
      context,
      new Point(paddleFromEdgeDistance, (contextHeight - height) / 2),
      width,
      height
    );
  }

  get color() {
    return colors.opponent;
  }

  move({bounds}: Ball) {
    this.origin.y = Math.max(
      0,
      Math.min(
        bounds.top - this.height / 2,
        this.context.height - this.height
      )
    );

    return this;
  }
}
