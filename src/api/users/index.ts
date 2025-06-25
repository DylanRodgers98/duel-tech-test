import { Router } from "express";
import { getUsers } from "./get-users.js";

const router = Router();

router.get("/", getUsers);

export const usersRouter = router;
