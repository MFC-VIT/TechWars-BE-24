import { CustomError } from "../utils/functions.js";
import lobbyModel from "../models/lobbyModel.js";
import teamModel from "../models/teamModel.js";

export const verifyTeamExists = async (req, res, next)=>{
  const teamId = req.teamid;
  if (!teamId) return next(CustomError(400, "Team Id required"));
  try {
    const team = await teamModel.findById(teamId);
    if (!team){
      return next(CustomError(400, "Team does not exist."));
    } 
    req.teamId = teamId;
    return next();
  } catch(error){
    return next(error);
  }
}

export const verifyLobbyExists = async (req, res, next)=>{
  const lobbyId = req.lobbyid;
  if (!lobbyId) return next(CustomError(400, "Lobby Id required"));
  try {
    const lobby = await lobbyModel.findById(lobbyId);
    if (!lobby){
      return next(CustomError(400, "Lobby does not exist."));
    }
    req.lobbyId = lobbyId;
    return next();
  } catch(error){
    return next(error);
  }
}

export const verifyLobbyExistsByName = async (req, res, next)=>{
  const lobbyName = req.headers.lobbyname;
  if (!lobbyName) return next(CustomError(400, "Lobby name required"));
  try {
    const lobby = await lobbyModel.findOne({ name: lobbyName });
    if (!lobby){
      return next(CustomError(400, "Lobby does not exist."));
    }
    req.lobbyId = lobby._id;
    return next();
  } catch(error){
    return next(error);
  }
}