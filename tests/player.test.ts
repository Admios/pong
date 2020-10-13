import Context from "../src/context";
import Player from "../src/player";
jest.mock("../src/context");
let context: Context;
let player: Player 
const name = 'Pepita'


describe("Give a player when", () => {
  
  beforeEach(() => {
    context = new Context();
    player = new Player(name, 1);
  });

  test("get score before call updateScore then score should be 0", () => {
    expect(player.score).toBe(0)
    player.updateScore()
    expect(player.toString()).toBe(`${name}: 1`)
  });

  test("get score after call updateScore then score should be 1", () => {
    player.updateScore()
    expect(player.score).toBe(1)
    expect(player.toString()).toBe(`${name}: 1`)
  });

});