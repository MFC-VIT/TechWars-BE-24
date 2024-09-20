export const gameStates = Object.freeze({
  quiz: "quiz",
  gameOver: "gameOver",
  idle: "idle",
});

export const stateDurations = Object.freeze({
  quiz: 30*60*1000
})

export const questionStates = Object.freeze({
  attempted: "attempted",
  notAttempted: "notAttempted",
  attempting: "attempting",
});

export const questionToSeed = 10; // for each team
