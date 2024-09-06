/**
 * * Checks
 * if (quiz){
 *  userState(quiz (that mean ques assigned for that round or not))
 *    checks if amount of questions requested is greater than the size of questions stored in userdb
 *    if (assigned) send the ques in "attempting" state
 *    else send ques in "notAttempted" state and make them "attempting"
 * }
 */


import { gameStates, questionStates } from "../constants.js";
import lobbyModel from "../models/lobbyModel.js";
import teamModel from "../models/teamModel.js";

export const startQuiz = async (req, res, next)=>{
  const teamId = req.params.teamId;
  const lobbyId = req.params.lobbyId;
  const quesCount = req.query.questions || 5;
  try {
    const team = await teamModel.findOne({
      _id: teamId,
      lobby_id: lobbyId
    });

    if (quesCount > teams.questions.length) return next(new Error("Invalid amount of questions requested"));

    const lobby = await lobbyModel.findOne({
      id: lobbyId,
      allTeams: {
        "$in": [teamsId]
      } 
    });

    if (team.state == gameStates.quiz){
      const attemptingQuestions = team.questions.filter((question)=>{
        question.state == questionStates.attempting
      }).map(({ _id, question, options })=>({ _id, question, options }));

      return res.status(200).json({
        questions: attemptingQuestions,
        success: true
      })
    } else {
        team.state = gameStates.quiz;
        lobby.state = gameStates.quiz;

        const startIndex = Math.floor(Math.random()*quesCount);
        const questions = [];
        const availableQues = team.questions;
        const quesChecked = 0;
        for (let i = startIndex; i < startIndex+quesCount;){
          const iterator = i >= availableQues.length ? i - availableQues.length : i;
          quesChecked++;
          if (team.questions[iterator].state == questionStates.notAttempted){
            team.questions[iterator].state = questionStates.attempting;
            questions.push(availableQues[iterator]);
            i++;
          }
          if (quesChecked == availableQues.length){
            break;
          }
        }
        await team.save();
        await lobby.save();
        return res.status(200).json({
          questions,
          count: questions.length,
          success: true
        })
    }
  } catch(error){
    next(error);
  }
}

/**
 * *Check
 *  if (question state != attempting) error
 *  else compare and return
 * }
 */


export const verifyAnswer = async (req, res, next)=>{
  const lobbyId = req.params.lobbyId;
  const teamId = req.params.teamsId;
  const quesId = req.params.quesId;
  const { answer } = req.body;
  try {
    const team = await teamModel.findOne({
      id: teamId,
      lobby_id: lobbyId
    });
    const quesIndex = team.questions.findIndex((question)=>(question._id == quesId));
    const question = team.questions[quesIndex];
    if (question.state != questionStates.attempting) return next(new Error("Invalid question id"));
    team.questions[quesIndex].state = questionStates.attempted;
    if (question.answer == answer){
      team.score += question.points;
      await team.save();
      return res.status(200).json({
        success: true,
        correct: true,
        pointsWon: question.points,
        currentScore: team.score,
      })
    } else {
      await team.save();
      return res.status(200).json({
        success: false,
        correct: false,
        pointsWon: 0,
        currentScore: team.score, 
      })
    }
  } catch(error){
    next(error);
  }
}

/**
 * check if any ques left to attempt
 * set all the attempting question to attempted question
 * change userState to idle
 */
export const submitQuiz = async (req, res)=>{
  const lobbyId = req.params.lobbyId;
  const teamId = req.params.teamId;
  try {
    const team = await teamModel.findOne({
      id: teamId,
      lobby_id: lobbyId 
    })

    for (let i = 0; i < team.questions.length; i++){
      if (team.questions[i].state == questionStates.attempting){
        team.questions[i].state = questionStates.attempted;
      }
    }
    
    team.state = gameStates.idle;

    const lobby = await lobbyModel.findOne({
      id: lobbyId,
      allTeams: {
        "$in": [teamsId]
      } 
    });

    const isQuizOver = true;    
    for (const teamId of lobby.allTeams){
      const team = await teamModel.findById(teamId);
      if (team.state != "idle") isQuizOver = false;
    }

    if (isQuizOver) lobby.state = gameStates.deploy;

    return res.json({
      teamState: team.state,
      lobbyState: lobby.state,
      success: true
    })

  } catch(error){
    next(error);
  }

}
