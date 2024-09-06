import lobbyModel from "../models/lobbyModel.js";
import teamModel from "../models/teamModel.js";

export const verifyTeamExists = async (req, res, next)=>{
  const teamId = req.params.teamId;
  try {
    const team = await teamModel.findById(teamId);
    if (!team){
      return next(new Error("Team does not exist."));
    } 
    req.teamId = teamId;
    next();
  } catch(error){
    return next(error);
  }
}

export const verifyLobbyExists = async (req, res, next)=>{
  const lobbyId = req.params.lobbyId;
  try {
    const lobby = await lobbyModel.findById(lobbyId);
    if (!lobby){
      return next(new Error("Lobby does not exist."));
    }
    req.lobbyId = lobbyId;
    next();
  } catch(error){
    return next(error);
  }
}