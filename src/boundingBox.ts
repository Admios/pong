import Point from "./point";
import Bounds from "./bounds";
import Context from "./context";

export default abstract class BoundingBox {
  protected origin: Point;
  protected width: number;
  protected height: number;
  protected context: Context;

  constructor(context: Context, origin: Point, width: number, height: number) {
    this.origin = origin;
    this.width = width;
    this.height = height;
    this.context = context;
  }

  abstract get color(): string;

  render() {
    this.context.instance.fillStyle = this.color;
    this.context.instance.fillRect(
      this.origin.x,
      this.origin.y,
      this.width,
      this.height
    );
    return this;
  }

  overlaps(box: BoundingBox) {
    const { top, right, bottom, left } = this.bounds;
    const {
      top: targetTop,
      right: targetRight,
      bottom: targetBottom,
      left: targetLeft,
    } = box.bounds;

    return (
      bottom > targetTop &&
      targetBottom > top &&
      right > targetLeft &&
      targetRight > left
    );
  }

  get bounds(): Bounds {
    return {
      top: this.origin.y,
      right: this.origin.x + this.width,
      bottom: this.origin.y + this.height,
      left: this.origin.x,
    };
  }
}
