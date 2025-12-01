import express from "express";
import contactController from "../controllers/contactController.js";

const router = express.Router();

// POST /api/contact - Send contact email
router.post("/", contactController.sendContactEmail);

export default router;
