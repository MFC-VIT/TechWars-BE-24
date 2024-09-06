import { Router } from "express";
import { getQuestions } from "../controllers/quizController.js";
import { verifyLobbyExists, verifyTeamExists } from './../middlewares/verifyExists.js';
const router = Router();

router.route("/questions/:lobbyId/:teamId").get(verifyLobbyExists, verifyTeamExists, getQuestions)

// router.route("/verify/:lobbyId/:teamId/:quesId").post(verifyLobbyExists, verifyTeamExists, verifyAnswer)

export default router;