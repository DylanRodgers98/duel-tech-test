import { Router } from "express";
import { advocatesRouter } from "./advocates/index.js";

const router = Router();

router.use("/advocates", advocatesRouter);

export const api = router;
