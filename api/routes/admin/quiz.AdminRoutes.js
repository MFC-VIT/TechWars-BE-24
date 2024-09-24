import { Router } from "express"
import { verifyAdmin } from "../../middlewares/verifyAdmin.js";
import { verifyLobbyExistsByName } from "../../middlewares/verifyExists.js";
import { initQuiz } from "../../controllers/quizController.js";
import { gameStates } from "../../../constants.js";
import { verifyLobbyState } from "../../middlewares/verifyState.js";

const router = new Router();

// // TODO: comment out lobby limit

router.route("/quiz/start").post(
  verifyAdmin,
  verifyLobbyExistsByName,
  verifyLobbyState([ gameStates.idle ]),
  initQuiz
)

// TODO: end quiz


export default router;