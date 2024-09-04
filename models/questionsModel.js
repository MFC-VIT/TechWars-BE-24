import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question:{
      type: String,
      required: true
    },
    // the options for this question
    options: {
      type: [String],
      required: true,
    },
    // the actual answer for this question
    answer:{
      type: String,
      required: true
    },
    // assigning question to users
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "team",
      required: true,
    },
    // if question has been ans or not
    isAnswered: {
      type: Boolean,
      default: false
    },
    // points for each question
    points: {
      type: Number,
      required: true
    }
})

const questionModel = mongoose.model('question',questionSchema);

export default questionModel;