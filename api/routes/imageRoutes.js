import express from "express";
import {
  createImage,
  getAllImages,
  getImageDetails,
} from "../controllers/imageController.js";

const router = express.Router();

router.post("/", createImage);
router.get("/", getAllImages);
router.get("/:imageId", getImageDetails);

export default router;
