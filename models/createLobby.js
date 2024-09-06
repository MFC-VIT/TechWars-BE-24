import mongoose from "mongoose";
const createSchema = new mongoose.Schema({
    lobbyId: { type: String, required: true }, // Unique identifier for the lobby
    teamIds: [{ type: String,required: true}], // R
    name: {
      type: String,
  
    },
    loginCount: { // Field to count logins
        type: Number,
        default: 0 // Default count is 0
    }
})
export default mongoose.model("create", createSchema);