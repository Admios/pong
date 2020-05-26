import BoundingBox from "./boundingBox";
import Point from "./point";
import { paddleFromEdgeDistance, dimensions, colors } from "./constants";
import Context from "./context";

export default class Player extends BoundingBox {
  constructor(context: Context) {
    const { height, width } = dimensions.paddle;
    const { width: contextWidth, height: contextHeight } = context;

    super(
      context,
      new Point(
        contextWidth - width - paddleFromEdgeDistance,
        (contextHeight - height) / 2
      ),
      width,
      height
    );

    this.context.onMove((e) => {
      this.origin.y = e.offsetY - this.height / 2;
    });
  }

  get color() {
    return colors.player;
  }
}
