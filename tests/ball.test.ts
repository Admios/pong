import Ball from "../src/ball";
import Context from "../src/context";
jest.mock("../src/context");
let context: Context;

beforeEach(() => {
  context = new Context();
});

test("counts number of hits against player paddle", () => {
  const ball = new Ball(context);
  expect(ball.totalHits).toBe(0);

  ball.bounceX();
  ball.bounceX();
  expect(ball.totalHits).toBe(2);
});

test("moves in the opposite direction when it hits an obstacle", () => {
  const difficulty = 1;
  const dt = 1;
  const ball = new Ball(context, { x: 1, y: 1 });
  const { right } = ball.bounds;

  ball.bounceX();
  ball.move(dt, difficulty);

  expect(ball.bounds.right).toBeLessThan(right);

  const { top } = ball.bounds;
  ball.bounceY();
  ball.move(dt, difficulty);

  expect(ball.bounds.top).toBeLessThan(top);
});
