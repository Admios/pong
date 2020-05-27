import Context from "./context";
import { dimensions, fonts, colors } from "./constants";

export default class Level {
  private context: Context;
  private level: number;
  constructor(context: Context) {
    this.context = context;
    this.level = 1;
  }

  up() {
    this.level++;
  }

  render() {
    const {
      stats: { top, maxWidth },
    } = dimensions;
    const { width, height } = this.context;

    const ctx = this.context.instance;
    ctx.fillStyle = colors.text;
    ctx.font = fonts.stats;
    ctx.fillText(
      `level: ${this.level.toString()}`,
      0.5 * (width - maxWidth),
      height - top,
      maxWidth
    );
  }
}
