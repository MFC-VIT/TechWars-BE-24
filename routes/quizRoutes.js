import { Router } from "express";
import { startQuiz, verifyAnswer, submitQuiz } from "../controllers/quizController.js";
import { verifyLobbyExists, verifyTeamExists } from './../middlewares/verifyExists.js';
import { verifyLobbyState } from "../middlewares/verifyState.js";
import { verifyTeamState } from './../middlewares/verifyState.js';
import { gameStates } from "../constants.js";
const router = Router();

/**
 * check if (lobby state and team state are not quiz)
 * then changes the state for that lobby and teams inside
 * assign questions
 */
// route:- /statequiz/[lobbyId]/[teamId]?questions=5(default)
router.route("/start/:lobbyId/:teamId").post(
  verifyLobbyExists, 
  verifyTeamExists,
  verifyLobbyState([gameStates.idle, gameStates.attack, gameStates.quiz]), // lobby state is controlled by server
  verifyTeamState([gameStates.idle, gameStates.quiz]), // if user resends the request in quiz state 
  startQuiz
)

/**
 * check if (lobby state and team state are quiz)
 * then checks the ans matches that ques
 * changes the question state to attempted.
 * assign points, if correct 
 */
router.route("/question/verify/:lobbyId/:teamId/:quesId").post(
  verifyLobbyExists, 
  verifyTeamExists, 
  verifyLobbyState([gameStates.quiz]),
  verifyTeamState([gameStates.quiz]),
  verifyAnswer
)

/**
 * check the (lobby and team gameStates are quiz or not.)
 * checks if (if there are pending question to be attempted)
 * Change the user state to idle
 * if (last team in lobby is sending the request) change the lobby state to deploy
 */
router.route("/submit/:lobbyId/:teamId").post(
  verifyLobbyExists, 
  verifyTeamExists, 
  verifyLobbyState([gameStates.quiz]),
  verifyTeamState([gameStates.quiz]),
  submitQuiz
)

export default router;