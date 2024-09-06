/**
  getQuestions,
  postAnswer,
 */

import { getNQuestions } from "../functions.js";
import teamModel from "../models/teamModel.js";

export const getQuestions = async (req, res, next)=>{
  const lobbyId = req.params.lobbyId; //lobby validation
  const teamId = req.params.teamId; //teamdId validation
  const questCount = req.query.questions || 5;
  try {
    const team = await teamModel.findOne({
      _id: teamId,
      lobby_id: lobbyId
    });
    const questions = getNQuestions(questCount, team.questions).map(
      ({ id, question, options, answer })=>({id, question, options, answer })
    );
    return res.status(200).json({
      questions,
      success: true
    })
  } catch(error){
    next(error);
  }
}