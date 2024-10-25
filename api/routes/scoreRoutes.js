import express from "express";
import {
  createScore,
  getScoresByImage,
} from "../controllers/scoreController.js";

const router = express.Router();

router.post("/", createScore);
router.get("/image/:imageId", getScoresByImage);

export default router;
