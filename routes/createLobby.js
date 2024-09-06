import express from "express";
import Create from "../models/createLobby.js";
import LoggedIn from "../models/loggedInModel.js";

const router = express.Router();

// Create a new lobby
router.post("/create-lobby", async (req, res) => {
  const { lobbyId, name } = req.body;

  try {
    if (!lobbyId) {
      return res.status(400).json({
        success: false,
        message: "lobbyId is required."
      });
    }

    // Check if the lobby already exists
    const existingLobby = await Create.findOne({ lobbyId });
    if (existingLobby) {
      return res.status(400).json({
        success: false,
        message: "Lobby already exists."
      });
    }

    // Create a new lobby
    const newLobby = new Create({
      lobbyId,
      name
    });

    await newLobby.save();

    res.status(201).json({
      success: true,
      message: "Lobby created successfully.",
      lobby: newLobby
    });
  } catch (error) {
    console.error("Error creating lobby:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the lobby.",
      error: error.message
    });
  }
});

// Add multiple teams to a lobby
router.post("/add-teams", async (req, res) => {
  const { lobbyId, teamIds } = req.body;

  try {
    if (!lobbyId || !teamIds || !Array.isArray(teamIds) || teamIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "lobbyId and a non-empty array of teamIds are required."
      });
    }

    // Find the lobby with the matching lobbyId
    const lobby = await Create.findOne({ lobbyId });

    if (!lobby) {
      return res.status(404).json({
        success: false,
        message: "Lobby not found."
      });
    }

    // Track errors for individual teams
    const errors = [];
    let addedTeamsCount = 0;

    for (const teamId of teamIds) {
      // Check if the teamId is already in the teamIds array
      if (lobby.teamIds.includes(teamId)) {
        errors.push(`Team ${teamId} already added.`);
        continue;
      }

      // Check if the maximum number of teams has been reached

      // Add the team to the lobby
      lobby.teamIds.push(teamId);

    }


      await lobby.save();
   

    res.status(200).json({
      success: true,
      message: "Teams added successfully.",
      lobby,
      errors
    });
  } catch (error) {
    console.error("Error adding teams:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the teams.",
      error: error.message
    });
  }
});

// Login a team to a lobby
router.post("/login-team", async (req, res) => {
  const { lobbyId, teamId } = req.body;

  try {
    if (!lobbyId || !teamId) {
      return res.status(400).json({
        success: false,
        message: "lobbyId and teamId are required."
      });
    }

    // Find the lobby with the matching lobbyId
    const lobby = await Create.findOne({ lobbyId });

    if (!lobby) {
      return res.status(404).json({
        success: false,
        message: "Lobby not found."
      });
    }

    // Check if the teamId is part of the lobby's teamIds
    if (!lobby.teamIds.includes(teamId)) {
      return res.status(400).json({
        success: false,
        message: "Team is not part of this lobby."
      });
    }

    // Check the number of teams already logged in
    const loggedInCount = await LoggedIn.countDocuments({ lobbyId });
    if (loggedInCount >= 6) {
      return res.status(400).json({
        success: false,
        message: "Maximum number of teams already logged in for this lobby."
      });
    }

    // Check if the teamId is already logged in
    const isAlreadyLoggedIn = await LoggedIn.findOne({ lobbyId, teamId });
    if (isAlreadyLoggedIn) {
      return res.status(400).json({
        success: false,
        message: "Team is already logged in."
      });
    }

    // Add the team to the LoggedIn collection
    const newLoggedIn = new LoggedIn({
      lobbyId,
      teamId
    });

    await newLoggedIn.save();

    // Increment the loginCount for the lobby
    await Create.updateOne(
      { lobbyId },
      { $inc: { loginCount: 1 } }
    );

    res.status(200).json({
      success: true,
      message: "Team logged in successfully."
    });
  } catch (error) {
    console.error("Error logging in team:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while logging in the team.",
      error: error.message
    });
  }
});

export default router;
