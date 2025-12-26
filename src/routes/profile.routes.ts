import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import { getProfile } from "../controllers/profile.controller.js";
import { login } from "../controllers/auth.controller.js";

const router = Router();

router.get("/", auth, getProfile);
router.get("/unAuth", getProfile);
router.get("/login", login);

export default router;
