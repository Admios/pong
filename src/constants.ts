export const paddleFromEdgeDistance = 0;
export const dimensions = {
  paddle: { width: 30 },
  ball: { height: 25, width: 25 },
  court: { height: 600, width: 1000 },
  border: { width: 5 },
  stats: { top: 30 },
};
export const colors = {
  border: "#F8F8FA",
  ball: "#D54DFF",
  court: "#333333",
  player: "#FF984D",
  opponent: "#9E4200",
  text: "#F8F8FA",
};
export const velocities = {
  ball: { x: 400, y: 200 },
};
export const fonts = {
  stats: {
    size: 24,
    family: "Courier New",
    style: "bold",
  },
  message: {
    size: 20,
    family: "Courier New",
    style: "bold",
  },
};
export const messages = {
  intro: [
    "Welcome to Admios!",
    "",
    "For a lot of us, videogames were our first",
    "introduction to the power of coding. And pong",
    "was the game that introduced the world to the" ,"power of videogames.",
    "",
    "We've recreated it here, and left several",
    "coding challenges for you in the repo.",
    "Take a look, spot the issues, submit a PR and",
    "maybe we'll invite you for an interview... Enjoy!",
    "",
    "Click to start...",
  ],
  outro: (humanScore: number, machineScore: number): string[] => [
    `You ${humanScore > machineScore ? "Won" : "Lost"}!!`,
    "",
    "Thanks for playing!",
    "If you have some time, take a look at the repo and see",
    "if you can solve any of the challenges we've left for you.",
    "",
    "Enjoy!",
  ],
};
export const scoreToLevelUp = 3;
export const hitsToLevelUp = 9;
export const maxDifficulty = 7;
export const nemeses = ["skynet", "voldemort", "dr. doom"];
export const Keyboard = {
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown'
}
