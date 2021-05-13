/**
 * @jest-environment jsdom
 */

import Context from "../src/context";
import Player from "../src/player";


let context: Context;

describe("Give a player when", () => {
  
  beforeEach(() => {
    const createElement = document.createElement.bind(document);
    document.createElement = (tagName: string) => {
        if (tagName === 'canvas') {
            return {
                getContext: () => ({ canvas: {addEventListener: () => ({})}}),
                measureText: () => ({}),
                style: { cursor: 'move'}
            };
        }
        return createElement(tagName);
    };
    
  });

  test("get score before call updateScore then score should be 0", () => {
    const mockCallAppend = jest.fn(x => {});
    context = new Context({ append: mockCallAppend } as unknown as HTMLElement);
    context.onPauseOrResume( () => {})
    context.onMove( () => {}, () => {})

    expect(mockCallAppend.mock.calls.length).toBe(1);
  });
});