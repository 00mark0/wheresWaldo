import express from "express";
import { createUser, getUserScores } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/:userId/scores", getUserScores);

export default router;
