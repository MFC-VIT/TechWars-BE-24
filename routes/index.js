import { Router } from "express";
import teamRouter from "./teamRoutes.js";
import quizRouter from "./quizRoutes.js"

const router = Router();

router.use("/team", teamRouter);
router.use("/quiz", quizRouter);

export default router;