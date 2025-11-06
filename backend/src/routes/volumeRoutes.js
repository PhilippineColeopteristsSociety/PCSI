import express from "express";
import volumeController from "../controllers/volumeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateVolume } from "../middlewares/validation.js";

const router = express.Router();

router.post("/", verifyToken, validateVolume, volumeController.createVolume);
router.get("/", volumeController.getVolume);
router.get("/:id", publicationController.getVolume);
router.put("/:id", verifyToken, validateVolume, volumeController.updateVolume);
router.patch("/:id/status", verifyToken, volumeController.toggleVolumeStatus);

export default router;
