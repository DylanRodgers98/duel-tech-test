import { Router } from "express";
import { engagementRouter } from "./engagement/index.js";

const router = Router();

router.use("/engagement", engagementRouter);

export const metricsRouter = router;
