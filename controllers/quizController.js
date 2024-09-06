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
      ({ _id, question, options })=>({ _id, question, options })
    );
    return res.status(200).json({
      questions,
      success: true
    })
  } catch(error){
    next(error);
  }
}

// export const verifyAnswer = async (req, res, next)=>{
//   const lobbyId = req.params.lobbyId;
//   const teamId = req.params.teamsId;
//   const quesId = req.params.quesId;
//   const { answer } = req.body;
//   try {
//     const team = await teamModel.findOne({
//       _id: teamId,
//       lobby_id: lobbyId
//     });
//     // console.log(team);
//     // console.log(team.questions);
//     const question = team.questions.find({ _id: quesId });
//   } catch(error){
//     next(error);
//   }
// }
