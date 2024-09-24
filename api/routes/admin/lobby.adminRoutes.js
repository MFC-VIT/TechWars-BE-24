import { Router } from "express"
import { verifyAdmin } from "../../middlewares/verifyAdmin.js";
import { verifyUniqueLobby } from "../../middlewares/verifyUnique.js";
import { createLobby, getAvailableLobbies, getLobbyData } from "../../controllers/lobbyController.js";
import { verifyLobbyExistsByName } from "../../middlewares/verifyExists.js";

const router = new Router();

/** 
 * Admin creates a lobby with custom lobby name
 * BODY: { lobbyName, limit{default: 6} }
 * HEADERS: { adminName }
 */
router.route("/create").post(
  verifyAdmin,
  verifyUniqueLobby,
  createLobby
)

/**
 * To get lobby date (teams score and leaderboard)
 * HEADERS: { adminName, lobbyName }
 */
router.route("/").get(
  verifyAdmin,
  verifyLobbyExistsByName,
  getLobbyData
)

/**
 * To get lobbies that are not full yet(max-capacity: 6 teams)
 * HEADER: { adminName }
 */
router.route("/available").get(
  verifyAdmin,
  getAvailableLobbies
)


export default router;