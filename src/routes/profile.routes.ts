import { Router } from "express";
import { getProfile } from "../controllers/profile.controller.js";
import { login } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/protect.js";

const router = Router();

router.get("/", protect, getProfile);
router.get("/unAuth", protect, getProfile);
router.post("/login", login);

export default router;
