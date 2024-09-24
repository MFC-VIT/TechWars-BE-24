import { Router } from "express"
import { verifyAdmin } from './../../middlewares/verifyAdmin.js';
import { verifyUniqueTerritory } from "../../middlewares/verifyUnique.js";
import { createTerritory, getAllTerritories, getAvailableTerritories, transferTerritory } from "../../controllers/territoryController.js";
import { verifyTeamExistsByName } from "../../middlewares/verifyExists.js";

const router = new Router();

// TODO: seeding territories

// // TODO: get all
// // TODO: create
// // TODO: get available territories
// // TODO: patch territory ownership

router.route("/create").post(
  verifyAdmin,
  verifyUniqueTerritory,
  createTerritory
)

router.route("/all").get(
  verifyAdmin,
  getAllTerritories
)

// not captured
router.route("/free").get(
  verifyAdmin,
  getAvailableTerritories,
)

//add or transfer ownership
// headers: { teamname }
// body: { name (name/alias) }
router.route("/transfer").patch(
  verifyAdmin,
  verifyTeamExistsByName,
  transferTerritory,
)


export default router;