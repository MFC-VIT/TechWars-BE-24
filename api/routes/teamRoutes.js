import { Router } from "express";
import { verifyLobbyExists, verifyTeamExists } from "../middlewares/verifyExists.js";
import { getAllTeams, getCurrentScore, loginTeam, logoutTeam } from "../controllers/teamController.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

/**
 * Teams login using provided lobby name and their team name
 * BODY: { teamName, lobbyName, password }
 */
router.route("/login").post(
  loginTeam
)

// to fetch all team of that lobby
router.route("/all").get(
  validateToken,
  verifyLobbyExists,
  verifyTeamExists,
  getAllTeams
)

/**
 * To change the gameState to gameOver for team and lobby (if every team inside lobby agree to the same state)
 * Headers: { (jwt with teamId, lobbyId) }
 */
router.route("/logout").post(
  validateToken,
  verifyLobbyExists,
  verifyTeamExists,
  logoutTeam
)

/**
 * To fetch the current score of a team
 * HEADERS: { (jwt with teamId, lobbyId) }
 */
router.route("/score").get(
  validateToken,
  // verifyLobbyExists,
  verifyTeamExists,
  getCurrentScore
)

export default router;