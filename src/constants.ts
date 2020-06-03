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
    size: 22,
    family: "Courier New",
    style: "bold",
  },
};
export const messages = {
  intro: [
    "Welcome to Admios!",
    "Help us make this game better",
    "Click to start...",
  ],
  outro: (humanScore: number, machineScore: number): string[] => [
    `You ${humanScore > machineScore ? "Won" : "Lost"}!!`,
    "The game has a few bugs",
    "Check out the repo and help us make it better",
  ],
};
export const scoreToLevelUp = 3;
export const hitsToLevelUp = 15;
export const maxDifficulty = 7;
export const nemeses = ["skynet", "voldemort", "dr. doom"];
