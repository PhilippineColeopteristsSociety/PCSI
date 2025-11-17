import express from "express";
import volumeController from "../controllers/volumeController.js";
import { verifyToken, requireRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All volume routes require authentication
router.use(verifyToken);

// Get all volumes
router.get("/", volumeController.getAllVolumes);

// Get volume by ID
router.get("/:id", volumeController.getVolumeById);

// Create new volume (admin only)
router.post("/", requireRole("admin"), volumeController.createVolume);

// Update volume (admin only)
router.put("/:id", requireRole("admin"), volumeController.updateVolume);

// Delete volume (admin only)
router.delete("/:id", requireRole("admin"), volumeController.deleteVolume);

export default router;
