import { gameStates } from "../../constants.js";
import lobbyModel from "../models/lobbyModel.js";

export const createLobby = async (req, res, next) => {
  const lobbyName = req.body.lobbyname;
  const limit = req.body.limit || 6;
  try {
    const lobby = await lobbyModel.create({
      name: lobbyName,
      limit,
    })
    return res.status(200).json({
      success: true,
      message: "Lobby created successfully",
      lobby: {
        id: lobby.id,
        name: lobby.name,
        state: lobby.state,
        limit: lobby.limit
      }
    })
  } catch(error){
    return next(error);
  }
};

/////////////////////////////////////////////////////////
export const getLobbyData = async (req, res, next)=>{
  const lobbyId = req.lobbyId;
  try {
    const lobby = await lobbyModel.findById(lobbyId);
    const { _id, name, state, limit, teams, quiz } = lobby;
    teams.sort((team1, team2)=>team2.score - team1.score);
    return res.status(200).json({
      success: true,
      lobby: {
        id: _id,
        name,
        state,
        limit,
        teams,
        quiz
      }
    })
  } catch(error){
    return next(error);
  }
}
//////////////////////////////////////////////////////////

export const getAvailableLobbies = async (req, res, next)=>{
  try {
    const lobbies = await lobbyModel.find({
      $expr: { $lt: [{ $size: "$teams" }, 6] },
      state: gameStates.idle
    });
    return res.status(200).json({
      availableLobbies: lobbies.map(({ id, name, state })=>({id, name, state})),
      success: true
    })
  } catch(error){
    return next(error);
  }
}
