import Ball from "./ball";

export default class Pong {
  height: number;
  width: number;
  context: CanvasRenderingContext2D;
  ball: Ball;

  constructor() {
    this.height = 800;
    this.width = 1000;
    this.context = this.canvas();

    this.renderCourt();
    this.ball = new Ball(this.context).render();

    this.animate();
  }

  animate() {
    let lastUpdate: number = null;
    const update = (elapsed: number) => {
      if (lastUpdate) {
        this.render((elapsed - lastUpdate) / 1000);
      }
      lastUpdate = elapsed;
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  render(delta: number) {
    this.renderCourt();
    this.ball.move(delta).render();
  }

  renderCourt() {
    this.context.fillStyle = "#000000";
    this.context.fillRect(0, 0, this.width, this.height);
  }

  canvas(): CanvasRenderingContext2D {
    const canvas = document.createElement("canvas");
    canvas.height = this.height;
    canvas.width = this.width;

    document.body.append(canvas);

    return canvas.getContext("2d");
  }
}
