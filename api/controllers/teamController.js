import { CustomError } from "../utils/functions.js";
import lobbyModel from "../models/lobbyModel.js";
import teamModel from "../models/teamModel.js";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { gameStates } from "../../constants.js";

const jwtSecret = process.env.JWT_SECRET;

/**
 * Check if lobby is full 
 * if not, then create team and add to lobby
 */

export const createTeam = async (req, res, next)=>{
  const { teamname, password } = req.body;
  const lobbyId = req.lobbyId;
  if (!teamname) return next(CustomError(400, "Team name is required"));
  try {
    const lobby = await lobbyModel.findById(lobbyId);
    if (lobby.allTeams.length == 6) return next(CustomError(400, "Lobby is full."));
    const team = await teamModel.create({
      team_name: teamname,
      lobby_id: lobbyId,
      password,
    });

    lobby.allTeams.push(team.id);
    await lobby.save();
    return res.status(200).json({
      success: true,
      message: "Team has been created and added to lobby successfully",
    })
  } catch(error){
    return next(error);
  }
}

/**
 * Returns a jwt with userId and lobbyId
 * gameCanStart: (true if activeTeams in lobby = 6 else false)
 */
export const loginTeam = async (req, res, next)=>{
  const { teamname, lobbyname, password } = req.body;
  try {
    const lobby = await lobbyModel.findOne({ name: lobbyname });
    if (!lobby) return next(CustomError(400, "Invalid lobby name."));

    const team = await teamModel.findOne({
      team_name: teamname,
      lobby_id: lobby.id,
      password,
    })

    if (!team) return next(CustomError(400, "Team does not exist | Team is not a part of this lobby | Incorrect password"));

    lobby.activeTeams.push(team._id);

    const token = jwt.sign({
      teamId: team._id,
      lobbyId: lobby._id
    }, jwtSecret, { expiresIn: '6h' });

    await lobby.save();

    if (lobby.activeTeams.length == 6){
      return res.status(200).json({
        success: true,
        message: "Team has been logged in successfully",
        gameCanStart: true,
        token,
        activeTeams: lobby.activeTeams.length

      })
    } else return res.status(200).json({
      success: true,
      message: "Team has been logged in successfully",
      gameCanStart: false,
      token,
      activeTeams: lobby.activeTeams.length
    })
  } catch(error){
    return next(error);
  }
}

/**
 * Logging out team at the end of game (changing gameState for team to gameOver acception no further request)
 * if (active teams in lobby is 0 then lobby state is also changed to gameOver)
 */
export const logoutTeam = async (req, res, next)=>{
  const teamId = req.teamId;
  const lobbyId = req.lobbyId;
  try {
    const lobby = await lobbyModel.findById(lobbyId);
    const team = await teamModel.findById(teamId);
    if (!(lobby.allTeams.includes(team._id))) return next(CustomError("Team is not present in this lobby"));
    team.state = gameStates.gameOver;
    lobby.activeTeams.splice(lobby.activeTeams.indexOf(team._id), 1);
    if (lobby.activeTeams.length == 0) lobby.state = gameStates.gameOver;
    await team.save();
    await lobby.save();
    return res.status(200).json({
      success: true,
      teamState: team.state,
      teamScore: team.score,
      lobbyState: lobby.state,
      activeTeams: lobby.activeTeams.length,
      message: "team has been logged out successfully"
    })
  } catch(error){
    return next(error);
  }
}

/**
 * this gets the current score of a team
 * since a get request, only checking the token and if lobby and team exists or not
 */
export const getCurrentScore = async (req, res, next)=>{
  const teamId = req.teamId;
  try {
    const team = await teamModel.findById(teamId);
    return res.status(200).json({
      success: true,
      currentScore: team.score
    })
  } catch(error){
    return next(error);
  }
}