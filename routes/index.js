import { Router } from "express";
import teamRouter from "./teamRoutes.js";
import quizRouter from "./quizRoutes.js"
import createLobby from "./createLobby.js"
const router = Router();

router.use("/team", teamRouter);
router.use("/quiz", quizRouter);
router.use("/",createLobby);
export default router;