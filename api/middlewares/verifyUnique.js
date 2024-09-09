import { CustomError } from "../utils/functions.js";
import lobbyModel from "../models/lobbyModel.js";
import teamModel from "../models/teamModel.js";

export const verifyUniqueLobby = async (req, res, next)=>{
  const lobbyName = req.body.lobbyname;
  if (!lobbyName) return next(CustomError(400, "Lobby name required"))
  try {
    const lobby = await lobbyModel.findOne({
      name: lobbyName
    })
    if (lobby) return next(CustomError(400, "Lobby already exists"));
    return next();
  } catch(error){
    return next(error);
  }
}

export const verifyUniqueTeam = async (req, res, next)=>{
  const teamName = req.body.teamname;
  if (!teamName) return next(CustomError(400, "Team name required"));
  try {
    const team = await teamModel.findOne({
      team_name: teamName
    })
    if (team) return next(CustomError(400, "Team already exists"));
    return next();
  } catch(error){
    return next(error);
  }
}