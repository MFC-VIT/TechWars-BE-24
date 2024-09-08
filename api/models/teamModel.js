import mongoose from "mongoose";
import { gameStates, questionStates } from "../../constants.js";
const  teamSchema = new mongoose.Schema({
  territory_id:[{
    type:mongoose.Schema.ObjectId,
  }],
  password:{
    type:String,
    required:true
  },
  lobby_id:{
    type:String,
    required:true
  },
  team_name:{
    type:String,
    required:true
  },
  state: {
    type: String,
    enum: Object.values(gameStates),
    default: gameStates.idle,
    required: true
  },
  areQuestionsSeeded: {
    type: Boolean,
    default: false
  },
  questions: [{
    id: String,
    question: String,
    options: [String],
    answer: String,
    state: {
      type: String,
      enum: Object.values(questionStates),
      default: questionStates.notAttempted,
    },
    points: Number,
  }],
  score:{
    type: Number,
    default: 0
  },
  rounds:{
    type:Number
  }
});

const teamModel = mongoose.model("team",teamSchema);

export default teamModel;