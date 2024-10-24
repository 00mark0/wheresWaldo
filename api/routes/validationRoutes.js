import express from "express";
import { validateClick } from "../controllers/validationController.js";

const router = express.Router();

router.post("/validate-click", validateClick);

export default router;
