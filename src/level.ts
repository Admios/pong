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

  get difficulty() {
    return this.level;
  }

  render() {
    const {
      stats: { top },
    } = dimensions;
    const { width, height } = this.context;

    const ctx = this.context.instance;
    const level = `level: ${this.level.toString()}`;
    ctx.fillStyle = colors.text;
    const { size, family, style } = fonts.stats;
    ctx.font = `${style} ${size}px ${family}`;
    ctx.fillText(
      level,
      0.5 * (width - ctx.measureText(level).width),
      height - top
    );
  }
}
