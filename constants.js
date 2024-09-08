export const gameStates = Object.freeze({
  quiz: "quiz",
  attack: "attack",
  deploy: "deploy",
  gameOver: "gameOver",
  idle: "idle",
});

export const stateDurations = Object.freeze({
  quiz: 2*60*1000
})

export const questionStates = Object.freeze({
  attempted: "attempted",
  notAttempted: "notAttempted",
  attempting: "attempting",
});

export const questionToSeed = 25; // for each team
