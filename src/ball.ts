import BoundingBox from "./boundingBox";
import Point from "./point";

export default class Ball extends BoundingBox {
  speed: { x: number; y: number; };
  constructor(context: CanvasRenderingContext2D, speed = { x: 400, y: 200 }) {
    super(context, new Point(0, 0), 20, 20);
    this.speed = speed;
  }

  move(delta: number) {
    const {
      canvas: { width, height },
    } = this.context;
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
