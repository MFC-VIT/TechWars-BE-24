import express from "express";
import Login from "../models/createLobby.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { lobbyId, teamId } = req.body;

  try {
    console.log(lobbyId,teamId)
    // Find the lobby with the matching lobbyId and check if the teamId is present in the teamIds array
    const lobby = await Login.findOne({ lobbyId, teamIds: teamId });

    if (lobby) {
      return res.status(200).json({
        success: true,
        message: "Login successful. Login and team matched.",
        lobby
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Login or team not found."
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while checking the lobby and team.",
      error: error.message
    });
  }
});

export default router;
