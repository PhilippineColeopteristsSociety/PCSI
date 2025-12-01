import Article from "../models/Article.js";
import { getCloudinaryPublicId } from "../utils/getPublicId.js";
import cloudinary from "../config/cloudinaryConfig.js";
import mongoose from "mongoose";

const articleService = {
  createArticle: async (
    volumeNo,
    seriesNo,
    month,
    year,
    title,
    doi,
    pageRange,
    abstract,
    keywords,
    authors,
    banner,
    pdfFile
  ) => {
    const article = await Article.create({
      volumeNo,
      seriesNo,
      month,
      year,
      title,
      doi,
      pageRange,
      abstract,
      keywords,
      authors,
      banner,
      pdfFile,
    });
    return article;
  },
  getArticles: async (limit = null, filters = {}) => {
    // Adjust filter for status to support both string "1" and numeric 1
    if (filters.status === "1" || filters.status === 1) {
      filters.status = { $in: ["1", 1] };
    }

    // console.log("Article filter applied:", filters);

    let query = Article.find(filters).sort({ createdAt: -1 });

    if (limit && limit > 0) {
      query = query.limit(parseInt(limit));
    }

    const articles = await query;
    // console.log("Articles returned:", articles.length);
    return articles;
  },
  getArticle: async (id) => {
    const article = await Article.findById(id);
    return article;
  },
  updateArticle: async (id, data) => {
    const objectId = new mongoose.Types.ObjectId(id);

    // Fetch existing article
    const article = await Article.findById(objectId);
    if (!article) {
      throw new Error("Article not found");
    }

    // Build uniqueness check conditions only for fields that are being changed
    const orConditions = [];
    if (data.title && data.title !== article.title) {
      orConditions.push({ title: data.title });
    }
    if (data.volumeNo !== undefined && data.volumeNo !== article.volumeNo) {
      orConditions.push({ volumeNo: data.volumeNo });
    }

    if (orConditions.length > 0) {
      const existingArticle = await Article.findOne({
        $or: orConditions,
        _id: { $ne: objectId },
      });
      if (existingArticle) {
        throw new Error("Volume No. or Title already exists");
      }
    }

    // Handle banner deletion scenarios
    if (article.banner) {
      if (data.banner) {
        // Scenario 1: User uploaded a new banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(article.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        // console.log(`Deleted old banner with public ID: ${publicId}`);
      } else if (data.removeBanner) {
        // Scenario 2: User clicked X to remove banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(article.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        // console.log(`Removed banner with public ID: ${publicId}`);
      }
      // Scenario 3: Neither data.banner nor data.removeBanner - keep existing banner
    }

    // Handle pdfFile deletion scenarios
    if (article.pdfFile) {
      if (data.pdfFile) {
        // Scenario 1: User uploaded a new pdfFile - delete old pdfFile
        const publicId = `pcsi/${getCloudinaryPublicId(article.pdfFile)}`;
        await cloudinary.uploader.destroy(publicId);
        // console.log(`Deleted old pdfFile with public ID: ${publicId}`);
      } else if (data.removePdfFile) {
        // Scenario 2: User clicked X to remove pdfFile - delete old pdfFile
        const publicId = `pcsi/${getCloudinaryPublicId(article.pdfFile)}`;
        await cloudinary.uploader.destroy(publicId);
        // console.log(`Removed pdfFile with public ID: ${publicId}`);
      }
      // Scenario 3: Neither data.pdfFile nor data.removePdfFile - keep existing pdfFile
    }

    // Remove removeBanner and removePdfFile flags from update data as they're not model fields
    const { removeBanner, removePdfFile, ...updateData } = data;

    const result = await Article.findByIdAndUpdate(objectId, updateData, {
      new: true,
    });
    return result;
  },
  toggleArticleStatus: async (id, status) => {
    const article = await Article.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true }
    );
    return article;
  },
};

export default articleService;
