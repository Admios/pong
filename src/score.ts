import Context from "./context";
import { dimensions, colors, fonts } from "./constants";
import Player from "./player";

export default class Score {
  private context: Context;
  private player: Player;
  constructor(context: Context, player: Player) {
    this.context = context;
    this.player = player;
  }

  render() {
    const {
      stats: { top },
    } = dimensions;

    const ctx = this.context.instance;
    const score = this.player.toString();
    ctx.fillStyle = colors.text;
    const { size, family, style } = fonts.stats;
    ctx.font = `${style} ${size}px ${family}`;
    ctx.fillText(
      score,
      this.player.screenOffsetFactor * this.context.width -
        0.5 * ctx.measureText(score).width,
      top
    );
  }
}
