import mongoose from "mongoose";

const loggedInSchema = new mongoose.Schema({
  lobbyId: {
    type: mongoose.Schema.Types.String,
    required: true,
    ref: 'Create'
  },
  teamId: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  loggedInAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('LoggedIn', loggedInSchema);
