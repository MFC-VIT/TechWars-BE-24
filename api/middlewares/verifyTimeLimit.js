import { CustomError } from "../utils/functions.js";
import lobbyModel from "../models/lobbyModel.js"

export const verifyQuizRunnig = async (req, res, next)=>{
  const lobbyId = req.lobbyId;
  try {
    const lobby = await lobbyModel.findById(lobbyId);
    const currentTime = Date.now();
    if (currentTime > lobby.quizEndedAt.getTime()){
      return next(CustomError(400, "Quiz has ended"))
    }
    return next();
  } catch(error){
    return next(error);
  }
}