import { Router } from "express"
import { validateToken } from "../middlewares/validateToken.js";
import { getAllTerritories, getAvailableTerritories } from "../controllers/territoryController.js";

const router = Router();

router.route("/all").get(
  validateToken,
  getAllTerritories
)

// not captured
router.route("/free").get(
  validateToken,
  getAvailableTerritories,
)

export default router;