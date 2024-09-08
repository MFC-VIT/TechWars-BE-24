import { Router } from "express";
import { verifyUniqueLobby, verifyUniqueTeam } from "../middlewares/verifyUnique.js";
import { createLobby, getAvailableLobbies } from "../controllers/lobbyController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { createTeam } from "../controllers/teamController.js";
import { verifyLobbyExistsByName } from "../middlewares/verifyExists.js";
import { initQuiz } from "../controllers/quizController.js";

const router = new Router();

/**
 * Admin creates a lobby with custom lobby name
 * BODY: { lobbyName }
 * HEADERS: { adminName }
 */
router.route("/lobby/create").post(
  verifyAdmin,
  verifyUniqueLobby,
  createLobby
)

/**
 * To get lobbies that are not full yet(max-capacity: 6 teams)
 * HEADER: { adminName }
 */
router.route("/lobby/available").get(
  verifyAdmin,
  getAvailableLobbies
)

/**
 * Admin create a team for a lobby with the available team name
 * and seed ques in userdb
 * HEADERS: { lobbyName, adminName }
 * BODY: { teamName, password }
 */
router.route("/team/create").post(
  verifyAdmin,
  verifyLobbyExistsByName,
  verifyUniqueTeam,
  createTeam
)

/**
 * Admin can start quiz for a lobby if lobby is full,
 * HEADERS: { adminName, lobbyName }
 */
router.route("/quiz/start").post(
  verifyAdmin,
  verifyLobbyExistsByName,
  initQuiz
)

export default router;