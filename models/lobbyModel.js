import mongoose from "mongoose";
import { gameStates } from "../constants.js";

const lobbySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  userCount: {
    type: Number,
  },
  // userPresent: [User],
  allTeams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "team"
  }],
  territoryId: {
    type: String,
    default: null,
  },
  roundsOver: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    enum: Object.values(gameStates),
    default: gameStates.idle,
    required: true
  },
  whosAttack: {},
  nextRoundTime: {},
  isQuizTime: {},
  isAttackTime: {},
  isTrainingTime: {},
});

export default mongoose.model("lobby", lobbySchema);
