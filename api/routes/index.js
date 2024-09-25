import { Router } from "express";
import teamRouter from "./teamRoutes.js";
import quizRouter from "./quizRoutes.js"
import territoryRouter from "./territoryRoutes.js"
import adminRouter from "./admin/index.js"

const router = Router();

router.use("/team", teamRouter);
router.use("/quiz", quizRouter);
router.use("/admin", adminRouter);
router.use("/territory", territoryRouter);

export default router;