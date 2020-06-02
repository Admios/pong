import BoundingBox from "./boundingBox";
import Point from "./point";
import { paddleFromEdgeDistance, dimensions, colors, fonts } from "./constants";
import Context from "./context";
import Player from "./player";

export default class Human extends BoundingBox {
  player: Player;
  constructor(context: Context) {
    const { width } = dimensions.paddle;
    const { width: contextWidth, height: contextHeight } = context;
    const paddleHeight = .25 * contextHeight;

    super(
      context,
      new Point(
        contextWidth - width - paddleFromEdgeDistance,
        0.5 * (contextHeight - paddleHeight)
      ),
      width,
      paddleHeight
    );

    this.context.onMove((e) => {
      this.origin.y = e.offsetY - 0.5 * this.height;
    });

    this.player = new Player("player", .75);
  }

  get color() {
    return colors.player;
  }
}
