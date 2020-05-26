import BoundingBox from "./boundingBox";
import Point from "./point";
import { colors } from "./constants";
import Context from "./context";

export default class Court extends BoundingBox {
  constructor(context: Context) {
    const { width, height } = context;
    super(context, new Point(0, 0), width, height);
  }

  get color() {
    return colors.court;
  }
}
