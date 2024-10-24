import express from "express";
import { createScore } from "../controllers/scoreController.js";

const router = express.Router();

router.post("/", createScore);

export default router;
