import { asyncHandler } from "../middlewares/errorHandler.js";
import articleService from "../services/articleService.js";
import { STATUS_CODES } from "../utils/constants.js";

const articleController = {
  createArticle: asyncHandler(async (req, res) => {
    const {
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
    } = req.body;
    const banner =
      req.files && req.files.image ? req.files.image[0].path : null;
    const pdfFile =
      req.files && req.files.pdfFile ? req.files.pdfFile[0].path : null;

    // Parse JSON strings for arrays
    const parsedKeywords = keywords ? JSON.parse(keywords) : [];
    const parsedAuthors = authors ? JSON.parse(authors) : [];

    const article = await articleService.createArticle(
      volumeNo,
      seriesNo,
      month,
      year,
      title,
      doi,
      pageRange,
      abstract,
      parsedKeywords,
      parsedAuthors,
      banner,
      pdfFile
    );
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Article created successfully",
      data: article,
    });
  }),

  getArticles: asyncHandler(async (req, res) => {
    const { limit, status, ...otherFilters } = req.query;

    // Build filters object
    const filters = {};
    if (status) filters.status = status;

    // Add other filters dynamically
    Object.keys(otherFilters).forEach((key) => {
      if (otherFilters[key] !== undefined && otherFilters[key] !== "") {
        filters[key] = otherFilters[key];
      }
    });

    const articles = await articleService.getArticles(limit, filters);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Articles fetched successfully",
      data: articles,
      count: articles.length,
      limit: limit ? parseInt(limit) : null,
      filters: filters,
    });
  }),

  getArticle: asyncHandler(async (req, res) => {
    const article = await articleService.getArticle(req.params.id);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Article fetched successfully",
      data: article,
    });
  }),

  updateArticle: asyncHandler(async (req, res) => {
    const {
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
      removeBanner,
      removePdfFile,
    } = req.body;
    const banner =
      req.files && req.files.image ? req.files.image[0].path : null;
    const pdfFile =
      req.files && req.files.pdfFile ? req.files.pdfFile[0].path : null;

    // Parse JSON strings for arrays
    const parsedKeywords = keywords ? JSON.parse(keywords) : [];
    const parsedAuthors = authors ? JSON.parse(authors) : [];

    const updateData = {
      volumeNo,
      seriesNo,
      month,
      year,
      title,
      doi,
      pageRange,
      abstract,
      keywords: parsedKeywords,
      authors: parsedAuthors,
    };

    // Handle banner updates
    if (banner) {
      updateData.banner = banner;
    } else if (removeBanner === "true" || removeBanner === true) {
      updateData.banner = null;
      updateData.removeBanner = true;
    }

    // Handle PDF file updates
    if (pdfFile) {
      updateData.pdfFile = pdfFile;
    } else if (removePdfFile === "true" || removePdfFile === true) {
      updateData.pdfFile = null;
      updateData.removePdfFile = true;
    }

    try {
      const article = await articleService.updateArticle(
        req.params.id,
        updateData
      );
      res.status(STATUS_CODES.OK).json({
        success: true,
        message: "Article updated successfully",
        data: article,
      });
    } catch (error) {
      if (error.message.includes("already exists")) {
        res.status(400).json({
          success: false,
          message: error.message,
        });
      } else {
        throw error;
      }
    }
  }),

  toggleArticleStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    const article = await articleService.toggleArticleStatus(
      req.params.id,
      status
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Article status updated successfully",
      data: article,
    });
  }),
};

export default articleController;
