import lobbyModel from "../models/lobbyModel.js";
import teamModel from "../models/teamModel.js";

/**
 * to verify current state from array of possible gameStates
 */

export const verifyTeamState = (checkStates)=>{
  return async (req, res, next)=>{
    const teamId = req.teamId;
    try {
      const team = await teamModel.findById(teamId);
      if (!team) return next(new Error("Team does not exist"));
      for (const state of checkStates){
        if (team.state == state) return next();
      }
      return next(new Error(`team is currently in ${team.state} state`));
    } catch(error){
      return next(error);
    }
  }
}

export const verifyLobbyState = (checkStates)=>{
  return async (req, res, next)=>{
    const lobbyId = req.lobbyId;
    try {
      const lobby = await lobbyModel.findById(lobbyId);
      if (!lobby) return next(new Error("Lobby does not exist"));
      for (const state of checkStates){
        if (lobby.state == state) return next();
      }
      return next(new Error(`Lobby is currently in ${lobby.state} state`));
    } catch(error){
      return next(error);
    }
  }
}