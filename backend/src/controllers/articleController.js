import { asyncHandler } from "../middlewares/errorHandler.js";
import articleService from "../services/articleService.js";
import { STATUS_CODES } from "../utils/constants.js";

const articleController = {
  createArticle: asyncHandler(async (req, res) => {
    const { volumeNo, seriesNo, month, year, doi } = req.body;
    const banner = req.file ? req.file.path : null;

    const article = await articleService.createArticle(
      volumeNo,
      seriesNo,
      month,
      year,
      doi,
      banner
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
    const { volumeNo, seriesNo, month, year, doi, removeBanner } = req.body;
    const banner = req.file ? req.file.path : null;

    const updateData = {
      volumeNo,
      seriesNo,
      month,
      year,
      doi,
    };

    // Handle banner updates
    if (banner) {
      updateData.banner = banner;
    } else if (removeBanner === "true" || removeBanner === true) {
      updateData.banner = null;
      updateData.removeBanner = true;
    }

    try {
      const article = await articleService.updateArticle(
        req.params.id,
        updateData
      );
      res.status(STATUS_CODES.OK).json({
        success: true,
        message: "Article updated successfully",
        data: volume,
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
