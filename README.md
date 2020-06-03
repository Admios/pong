# Congratulations!

It seems you are curious about our Pong game implementation! We like curious minds, so here are a few things you can try to impress us with:

## Challenges:

Feel free to show off your skills implementing one or more of the following challenges:

1. Increase Unit Test coverage to 90% or above. For extra points, do not change this `jest` setting `--env=node`
2. Revise the Object Oriented Model of the game, tell us how you would have modeled it instead. (extra points for a UML diagram)
3. Change the shape and dimensions of the ball, how about instead of a simple square, a spinning letter "A"  - for ADMIOS ;)
4. Make the Canvas responsive!! Currently it has pixel-based `width` and `height`, can you make adapt to 100% of the dimension the DOM element its hosted inside??
5. Add arrow keys support to move the player paddle
6. modify the ball’s speed and trajectory when hit by a paddle factoring in the paddle speed and direction



## Scripts

Build pipeline is run using GitHUb Workflows. Refer to `deploy.yml` for pipeline details.

### `yarn start:dev`
To quickly browse the game:

### `yarn watch:dev`
To watch and recompile changes

### `yarn test`
To Run tests

### `yarn test:dev`
To run tests in watch mode

### `yarn build:prod` 
To create an optimized production build (minified JavaScript) and create a `test.html` page to test the artifacts. The build output is versioned based on the semantic version in `package.json` with the following format: `main_vx.x.x.js`

### `yarn deploy`
Deploys the minified JavaScript assets and test page to Google Cloud Platform using a project configured for static hosting

## Using in a webpage

1. Add a reference to the deployed script
```HTML
<script src="https://admios-pong.web.app/main_v1.0.1.js"></script>
```

The Game classes are added to the global `window` object with the following namespace: `window.admios.pong`

2. Instantiate a game instance and provide the `HTML` host element (e.g. a simple `<div>`)
```JavaScript
const root = document.getElementById("pong");

const { Context, Game } = window.admios.pong;
const game = new Game(new Context(root));
```

And that's it!

Enjoy playing and ***modifying*** the game!




