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
    question: String,
    options: [String],
    answer: String,
    isAnswered: {
      type: Boolean,
      default: false
    }
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