import mongoose from "mongoose";

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
  allUsers: [{
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
  whosAttack: {},
  isQuiz: {},
  isAttack: {},
  isTraining: {},
  nextRoundTime: {},
  isQuizTime: {},
  isAttackTime: {},
  isTrainingTime: {},
});

export default mongoose.model("lobby", lobbySchema);
