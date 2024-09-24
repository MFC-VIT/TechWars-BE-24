import { Router } from "express";
import teamRouter from "./teamRoutes.js";
import quizRouter from "./quizRoutes.js"
import adminRouter from "./admin/index.js"

const router = Router();

router.use("/team", teamRouter);
router.use("/quiz", quizRouter);
router.use("/admin", adminRouter);

export default router;