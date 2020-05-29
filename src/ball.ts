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
  speed: { x: number; y: number };
  private hits: number;

  constructor(context: Context, velocity = velocities.ball) {
    const { height, width } = dimensions.ball;
    const ballStartingOffset = paddleFromEdgeDistance + dimensions.paddle.width;
    const courtHeight = dimensions.court.height;

    super(
      context,
      new Point(ballStartingOffset, 0.5 * (courtHeight - height)),
      width,
      height
    );
    this.speed = velocity;
    this.hits = 0;
  }

  get color() {
    return colors.ball;
  }

  bounceX() {
    this.speed.x *= -1;
    this.hits++;
  }

  bounceY() {
    this.speed.y *= -1;
  }

  get totalHits() {
    return this.hits;
  }

  move(delta: number, difficulty: number) {
    let fx = 1;
    let fy = 1;
    if (difficulty > 1) {
      const normal = Math.sqrt(this.speed.x ** 2 + this.speed.y ** 2);
      fx = Math.abs(this.speed.x / normal) * difficulty * 0.75;
      fy = Math.abs(this.speed.y / normal) * difficulty * 0.75;
    }

    this.origin.x += delta * this.speed.x * fx;
    this.origin.y += delta * this.speed.y * fy;

    return this;
  }
}
