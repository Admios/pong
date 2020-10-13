

import BoundingBox from "../src/boundingBox";
import { colors } from "../src/constants";
import Context from "../src/context";
import Human from "../src/human";
import Machine from "../src/machine";
jest.mock("../src/context");
let context: Context;
let human: BoundingBox 


describe("Give a human player when", () => {
  
  beforeEach(() => {
    context = new Context();
    human = new Human(context);
  });

  test("get color human then should be equals colors player from constants", () => {
    expect(human.color).toBe(colors.player);
  });

  test("call render function then should be called fillRect once time", () => {
    const mockCallFillRect = jest.fn(x => {});
    context.instance = {
      fillStyle: '',
      fillRect: mockCallFillRect
    } as unknown as CanvasRenderingContext2D;
    
    human.render()
    
    expect(mockCallFillRect.mock.calls.length).toBe(1);
  });

  test("get bounds then should be the top, right bottom and left are not NaN ", () => {
    context.height = 10
    context.width = 10
    human = new Human(context);
    
    const { top, right, bottom, left} = human.bounds
  
    expect(top).toBe(3.75);
    expect(right).toBe(10);
    expect(bottom).toBe(6.25);
    expect(left).toBe(-20);
  });

  test("there is a machine instance with overlaps of the human should be returned true ", () => {
    context.height = 10
    context.width = 10
    human = new Human(context);
    const boundTest  = new Machine(context)

    
     const isOverLaps = human.overlaps(boundTest)
  
     expect(isOverLaps).toBeTruthy()
  
  });

  test("there is a machine instance without overlaps of the human should be returned false ", () => {
    context.height = 10
    context.width = 10
    human = new Human(context);
    const boundTest  = new Machine( {...context, height: 50, width: 60 } as Context)

    const isOverLaps = human.overlaps(boundTest)

    expect(isOverLaps).toBeFalsy()
  });
});