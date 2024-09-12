import mongoose from "mongoose";
import { gameStates } from "../../constants.js";

const lobbySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // loggedInAt: {
  //   type: Date,
  //   default: Date.now()
  // },
  // userCount: {
  //   type: Number,
  // },
  // userPresent: [User],
  allTeams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "team"
  }],
  // teams that have logged in
  activeTeams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "team"
  }],
  // territoryId: {
  //   type: String,
  //   default: null,
  // },
  // roundsOver: {
  //   type: Boolean,
  //   default: false,
  // },
  state: {
    type: String,
    enum: Object.values(gameStates), // ["idle", "quiz", "gameOver"]
    default: gameStates.idle,
  },
  quizStartedAt: {
    type: Date
  },
  quizEndedAt: {
    type: Date
  },
  // whosAttack: {},
  // nextRoundTime: {},
  // isQuizTime: {},
  // isAttackTime: {},
  // isTrainingTime: {},
});

const lobbyModel = mongoose.model("lobby", lobbySchema);

export default lobbyModel;
