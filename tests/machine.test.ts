

import Ball from "../src/ball";
import { colors } from "../src/constants";
import Context from "../src/context";
import Human from "../src/human";
import Machine from "../src/machine";
jest.mock("../src/context");
let context: Context;
let machine: Machine 


describe("Give a machine when", () => {
  
  beforeEach(() => {
    context = new Context();
    machine = new Machine(context);
  });

  test("get color machine then should be equals colors player from constants", () => {
    expect(machine.color).toBe(colors.opponent);
  });

  test("call render function then should be called fillRect once time", () => {
    const mockCallFillRect = jest.fn(x => 42 + x);
    context.instance = {
      fillStyle: '',
      fillRect: mockCallFillRect
    } as unknown as CanvasRenderingContext2D;
    
    machine.render()
    
    expect(mockCallFillRect.mock.calls.length).toBe(1);
  });

  test("get bounds then should be the top, right bottom and left are not NaN ", () => {
    context.height = 10
    context.width = 10
    machine = new Machine(context);
    
    const { top, right, bottom, left} = machine.bounds
  
    expect(top).toBe(3.75);
    expect(right).toBe(30);
    expect(bottom).toBe(6.25);
    expect(left).toBe(0);
  });

  test("there is a human instance with overlaps of the machine should be returned true ", () => {
    context.height = 10
    context.width = 10
    machine = new Machine(context);
    const boundTest  = new Human(context)

    
     const isOverLaps = machine.overlaps(boundTest)
  
     expect(isOverLaps).toBeTruthy()
  
  });

  test("there is a human instance without overlaps of the machine should be returned false ", () => {
    context.height = 10
    context.width = 10
    machine = new Machine(context);
    const boundTest  = new Human( {...context, height: 50, width: 60 } as Context)

    const isOverLaps = machine.overlaps(boundTest)

    expect(isOverLaps).toBeFalsy()
  });

  test("call move function with speed negative then uncertainty should be 1.75", () => {

    machine = new Machine({...context, height: 10, width: 10} as Context);
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.9;
    global.Math = mockMath;

    let ball = { bounds: { top: 10, bottom: 10, left: 40}, speed: { x: -10 } } as unknown as Ball

    let out = machine.move(ball)
    
    expect((out as any).uncertainty).toBe(1.75);
  });

  test("call move function twice times with speed negative then uncertainty should be 1.75", () => {

    machine = new Machine({...context, height: 10, width: 10} as Context);
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.9;
    global.Math = mockMath;

    let ball = { bounds: { top: 10, bottom: 10, left: 41}, speed: { x: -10 } } as unknown as Ball
    machine.move(ball)
    let out = machine.move(ball)
    
    expect((out as any).uncertainty).toBe(1.75);
  });

  test("call move function with speed positive and random 0.9 then uncertainty should be 0", () => {

    machine = new Machine({...context, height: 10, width: 10} as Context);
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.9;
    global.Math = mockMath;


    const ball = { bounds: { top: 10, bottom: 10, left: 40}, speed: { x: 10 } } as unknown as Ball
    let out = machine.move(ball)

    expect((out as any).uncertainty).toBe(0);
  });
});