import { Router } from "express";
import { verifyUniqueLobby, verifyUniqueTeam } from "../middlewares/verifyUnique.js";
import { createLobby, getAvailableLobbies, getLobbyData } from "../controllers/lobbyController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { createTeam, forceMigrateTeam, getTeamData, migrateTeam } from "../controllers/teamController.js";
import { verifyLobbyExistsByName, verifyTeamExistsByName } from "../middlewares/verifyExists.js";
import { initQuiz } from "../controllers/quizController.js";
import { verifyLobbyState, verifyTeamState } from "../middlewares/verifyState.js";
import { gameStates } from "../../constants.js";

const router = new Router();

/** 
 * Admin creates a lobby with custom lobby name
 * BODY: { lobbyName, limit{default: 6} }
 * HEADERS: { adminName }
 */
router.route("/lobby/create").post(
  verifyAdmin,
  verifyUniqueLobby,
  createLobby
)

/**
 * To get lobby date (teams score and leaderboard)
 * HEADERS: { adminName, lobbyName }
 */
router.route("/lobby").get(
  verifyAdmin,
  verifyLobbyExistsByName,
  getLobbyData
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
 * To get team data 
 * HEADERS: { adminName, teamname }
 */
router.route("/team").get(
  verifyAdmin,
  verifyTeamExistsByName,
  getTeamData
)
////////////////////////////////////////////////
/**
 * Place team to another lobby,
 * check if team and lobby exists
 * check its state is idle or  not
 * make it inactive for its previous lobby
 * check if already present in new lobby
 * check if new lobby is already full
 * ??? reset user score
 * HEADERS: { adminname, lobbyname, teamname }
*/
router.route("/team/migrate").post(
  verifyAdmin,
  verifyLobbyExistsByName,
  verifyTeamExistsByName,
  verifyLobbyState([ gameStates.idle ]), // state of new lobby
  verifyTeamState([ gameStates.idle ]),
  migrateTeam,
)

/**
 * /team/migrate/force
 * If team mistakenly loses the auth token, admin can forcefully logout the team 
 * team will be removed from the lobby
 * team state will be changed to idle
 * team can be migrated to new lobby, score is reset
 */

router.route("/team/migrate/force").post(
  verifyAdmin,
  verifyTeamExistsByName,
  verifyLobbyExistsByName,
  verifyLobbyState([ gameStates.idle ]),
  forceMigrateTeam
)
////////////////////////////////////////////////

/**
 * Admin can start quiz for a lobby if lobby is full,
 * HEADERS: { adminName, lobbyName }
 */
router.route("/quiz/start").post(
  verifyAdmin,
  verifyLobbyExistsByName,
  verifyLobbyState([ gameStates.idle ]),
  initQuiz
)

export default router;