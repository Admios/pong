export const paddleFromEdgeDistance = 40;
export const dimensions = {
  paddle: { height: 150, width: 30 },
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
    "Help us make this game better",
    "Click to start...",
  ],
};
