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
      stats: { top, maxWidth },
    } = dimensions;

    const ctx = this.context.instance;
    ctx.fillStyle = colors.text;
    ctx.font = fonts.stats;
    ctx.fillText(
      this.player.toString(),
      this.player.screenOffsetFactor * this.context.width - 0.5 * maxWidth,
      top,
      maxWidth
    );
  }
}
