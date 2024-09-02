import { Router } from "express";
import teamRouter from "./teamRoutes.js";

const router = Router();

router.use("/team", teamRouter);

export default router;