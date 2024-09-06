import mongoose from "mongoose";
import { boolean } from "zod";
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
  questions: [{
    id: String,
    question: String,
    options: [String],
    answer: String,
    state: {
      type: Boolean,
      default: false
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