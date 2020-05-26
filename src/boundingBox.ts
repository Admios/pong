import Point from "./point";

export default class BoundingBox {
  origin: Point;
  width: number;
  height: number;
  context: CanvasRenderingContext2D;
  constructor(context: CanvasRenderingContext2D, origin: Point, width: number, height: number) {
    this.origin = origin;
    this.width = width;
    this.height = height;
    this.context = context;
  }

  render() {
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(
      this.origin.x,
      this.origin.y,
      this.width,
      this.height
    );
    return this;
  }

  get bounds() {
    return {
      top: this.origin.y,
      right: this.origin.x + this.width,
      bottom: this.origin.y + this.height,
      left: this.origin.x,
    };
  }
}
