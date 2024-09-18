/**
 * * Checks
 * if (quiz){
 *  userState(quiz (that mean ques assigned for that round or not))
 *    checks if amount of questions requested is greater than the size of questions stored in userdb
 *    if (assigned) send the ques in "attempting" state
 *    else send ques in "notAttempted" state and make them "attempting"
 * }
 */


import { gameStates, questionStates, stateDurations } from "../../constants.js";
import { CustomError, shuffleArray } from "../utils/functions.js";
import lobbyModel from "../models/lobbyModel.js";
import teamModel from "../models/teamModel.js";

export const initQuiz = async (req, res, next)=>{
  const lobbyName = req.headers.lobbyname;
  try {
    const lobby = await lobbyModel.findOne({ name: lobbyName });
    if (lobby.teams != lobby.limit){
      return next(CustomError(400, `Only ${lobby.teams.length} teams are present in lobby. ${lobby.limit} teams are required to init the quiz.`))
    }
    // If all teams of lobby have logged in then quiz can start
    if (lobby.activeCount != lobby.teams.length) return next(CustomError(400, `Only ${lobby.activeCount} has/have joined`));

    lobby.state = gameStates.quiz;
    lobby.quiz.startedAt = Date.now();
    lobby.quiz.endedAt = new Date(lobby.quiz.startedAt.getTime() + stateDurations.quiz);
    await lobby.save();
    
    return res.status(200).json({
      currentState: lobby.state,
      quizStartedAt: lobby.quiz.startedAt,
      quizEndsAt: lobby.quiz.endedAt,
      success: true,
      message: "Quiz has been initialized successfully"
    })
  } catch(error){
    return next(error);
  }
}

export const startQuiz = async (req, res, next)=>{
  const teamId = req.teamId;
  const lobbyId = req.lobbyId;
  const quesCount = parseInt(req.query.questions) || 5;
  try {
    const team = await teamModel.findOne({
      _id: teamId,
      lobby_id: lobbyId
    });

    if (quesCount > team.questions.length) return next(CustomError(400, "Invalid amount of questions requested"));

    const lobby = await lobbyModel.findOne({
      _id: lobbyId,
      "teams.teamId": team._id
    });

    if (!lobby.teams.find(team=>team.teamId == team._id).active) return next(CustomError(400, `Team: ${team.team_name} has not logged in yet.`))
    if (!team.areQuestionsSeeded) return next(CustomError(400, "Question have not been seeded yet."))


    if (team.state == gameStates.quiz){
      const attemptingQuestions = team.questions.filter((question)=>(
        question.state === questionStates.attempting
      ));
      return res.status(200).json({
        questions: attemptingQuestions.map(({ id, question, options })=>({ s_no: id, question, options })),
        count: attemptingQuestions.length,
        success: true
      })
      
    } else {
        team.state = gameStates.quiz;

        const startIndex = Math.floor(Math.random() * team.questions.length);
        let questions = [];
        const availableQues = team.questions;
        let quesChecked = 0;
        let i = 0;

        while (i < quesCount && quesChecked < availableQues.length){
          const iterator = (i+startIndex) % availableQues.length;
          if (team.questions[iterator].state == questionStates.notAttempted){
            team.questions[iterator].state = questionStates.attempting;
            questions.push(availableQues[iterator]);
            i++;
          }
          quesChecked++;
        }
        
        await team.save();
        await lobby.save();
        
        questions = shuffleArray(questions);

        return res.status(200).json({
          questions: questions.map(
            ({ _id, id, question, options })=>({ _id, s_no: id, question, options })
          ),
          count: questions.length,
          success: true
        })
    }
  } catch(error){
    return next(error);
  }
}

/**
 * *Check
 *  if (question state != attempting) error
 *  else compare and return
 * }
 */


export const verifyAnswer = async (req, res, next)=>{
  const lobbyId = req.lobbyId;
  const teamId = req.teamId;
  const quesId = req.headers.s_no;
  
  const answer = req.body.answer;
  try {
    const team = await teamModel.findOne({
      _id: teamId,
      lobby_id: lobbyId
    });

    const questions = team.questions;
    const index = questions.findIndex((question)=>(question.id == quesId));
    if (questions[index].state != questionStates.attempting) return next(CustomError(400, "Invalid question id || question is not in attempting state."));
    questions[index].state = questionStates.attempted;
    team.questions = questions;

    if (questions[index].answer == answer){
      team.score += questions[index].points;
      await team.save();
      return res.status(200).json({
        success: true,
        correct: true,
        pointsWon: questions[index].points,
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
    return next(error);
  }
}

/**
 * check if any ques left to attempt
 * set all the attempting question to attempted question
 * change userState to idle
 */
export const submitQuiz = async (req, res, next)=>{
  const lobbyId = req.lobbyId;
  const teamId = req.teamId;
  try {
    const team = await teamModel.findOne({
      _id: teamId,
      lobby_id: lobbyId 
    })

    for (let i = 0; i < team.questions.length; i++){
      if (team.questions[i].state == questionStates.attempting){
        team.questions[i].state = questionStates.attempted;
      }
    }
    
    team.state = gameStates.idle;

    await team.save();

    const lobby = await lobbyModel.findOne({
      _id: lobbyId,
      "teams.teamId": team._id 
    });

    let isQuizOver = true;    
    for (const teamObj of lobby.teams){
      const team = await teamModel.findById(teamObj.teamId);
      if (team.state != gameStates.idle) isQuizOver = false;
    }

    if (isQuizOver) lobby.state = gameStates.gameOver
    
    await lobby.save();

    return res.json({
      teamState: team.state,
      lobbyState: lobby.state,
      success: true
    })

  } catch(error){
    return next(error);
  }

}
