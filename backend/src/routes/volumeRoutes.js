import express from "express";
import volumeController from "../controllers/volumeController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateVolume } from "../middlewares/validation.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  upload.single("image"),
  validateVolume,
  volumeController.createVolume
);
router.get("/", volumeController.getVolumes);
router.get("/:id", volumeController.getVolume);
router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  validateVolume,
  volumeController.updateVolume
);
router.patch("/:id/status", verifyToken, volumeController.toggleVolumeStatus);

export default router;
