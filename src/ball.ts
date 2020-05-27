import BoundingBox from "./boundingBox";
import Point from "./point";
import {
  colors,
  velocities,
  dimensions,
  paddleFromEdgeDistance,
} from "./constants";
import Context from "./context";

export default class Ball extends BoundingBox {
  private speed: { x: number; y: number };

  constructor(context: Context, velocity = velocities.ball) {
    const { height, width } = dimensions.ball;
    const ballStartingOffset = paddleFromEdgeDistance + dimensions.paddle.width;
    const courtHeight = dimensions.court.height;

    super(
      context,
      new Point(ballStartingOffset, .5 * courtHeight),
      width,
      height
    );
    this.speed = velocity;
  }

  get color() {
    return colors.ball;
  }

  bounceX() {
    this.speed.x *= -1;
  }

  bounceY() {
    this.speed.y *= -1;
  }

  move(delta: number) {
    this.origin.x += delta * this.speed.x;
    this.origin.y += delta * this.speed.y;

    return this;
  }
}
