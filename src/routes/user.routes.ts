import express from "express";
import { createUser, getUserByEmail } from "../controllers/getUserByEmail.js";

const router = express.Router();

router.post("/register", createUser);
router.get("/:email", getUserByEmail);

export default router;
