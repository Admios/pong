import Context from "./context";
import { colors, fonts } from "./constants";

export default class Message {
  context: Context;
  constructor(context: Context) {
    this.context = context;
  }

  render(text: string[]) {
    const { height, width } = this.context;
    const ctx = this.context.instance;
    const { size, family, style } = fonts.message;
    ctx.font = `${style} ${size}px ${family}`;
    ctx.shadowColor = colors.opponent;
    ctx.shadowBlur = 7;
    ctx.fillStyle = colors.text;
    text.forEach((line, index) => {
      ctx.fillText(
        line,
        0.5 * (width - ctx.measureText(line).width),
        0.5 * height + (index + 1) * size * 1.15
      );
    })
    
    return this;
  }
}
