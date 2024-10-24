import express from "express";
import { createCoordinate } from "../controllers/coordinateController.js";

const router = express.Router();

router.post("/", createCoordinate);

export default router;
