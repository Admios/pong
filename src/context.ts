import { dimensions } from "./constants";

export default class Context {
  private root: HTMLElement;
  instance: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(
    root: HTMLElement = document.body,
    config = { ...dimensions.court }
  ) {
    this.root = root;
    const { width, height } = config;
    this.width = width;
    this.height = height;
    
    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;

    this.instance = canvas.getContext("2d");
    this.root.append(canvas);
  }

  onMove(handler: (this: HTMLCanvasElement, ev: MouseEvent) => void) {
    this.instance.canvas.addEventListener("mousemove", handler);
  }
}
