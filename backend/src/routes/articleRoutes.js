import express from "express";
import articleController from "../controllers/articleController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validateArticle } from "../middlewares/validation.js";
import upload from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  validateArticle,
  articleController.createArticle
);
router.get("/", articleController.getArticles);
router.get("/:id", articleController.getArticle);
router.put(
  "/:id",
  verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdfFile", maxCount: 1 },
  ]),
  validateArticle,
  articleController.updateArticle
);
router.patch("/:id/status", verifyToken, articleController.toggleArticleStatus);

export default router;
