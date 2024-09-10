import lobbyModel from "../models/lobbyModel.js";

export const createLobby = async (req, res, next) => {
  const lobbyName = req.body.lobbyname;
  try {
    const lobby = await lobbyModel.create({
      name: lobbyName
    })
    return res.status(200).json({
      success: true,
      message: "Lobby created successfully",
      lobby: {
        id: lobby.id,
        name: lobby.name
      }
    })
  } catch(error){
    return next(error);
  }
};

export const getAvailableLobbies = async (req, res, next)=>{
  try {
    const lobbies = await lobbyModel.find({
      $expr: { $lt: [{ $size: "$allTeams" }, 6] }
    });
    return res.status(200).json({
      availableLobbies: lobbies.map(({ id, name })=>({id, name})),
      success: true
    })
  } catch(error){
    return next(error);
  }
}