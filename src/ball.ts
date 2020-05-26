import BoundingBox from "./boundingBox";
import Point from "./point";
import { colors, velocities, dimensions } from "./constants";
import Context from "./context";

export default class Ball extends BoundingBox {
  private speed: { x: number; y: number };

  constructor(context: Context, velocity = velocities.ball) {
    const { height, width } = dimensions.ball;
    super(context, new Point(0, 0), width, height);
    this.speed = velocity;
  }

  get color() {
    return colors.ball;
  }

  move(delta: number) {
    const { width, height } = this.context;
    const { top, right, left, bottom } = this.bounds;

    if (left < 0 || right > width) {
      this.speed.x *= -1;
    }

    if (top < 0 || bottom > height) {
      this.speed.y *= -1;
    }

    this.origin.x += delta * this.speed.x;
    this.origin.y += delta * this.speed.y;

    return this;
  }
}
