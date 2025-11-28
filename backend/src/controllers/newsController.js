import { asyncHandler } from "../middlewares/errorHandler.js";
import newsService from "../services/newsService.js";
import { STATUS_CODES } from "../utils/constants.js";

const newsController = {
  createNews: asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const banner = req.file ? req.file.path : null;

    const news = await newsService.createNews(
      title,
      description,
      banner
    );
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "News created successfully",
      data: news,
    });
  }),
  getAllNews: asyncHandler(async (req, res) => {
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

    const news = await newsService.getAllNews(
      limit,
      filters
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "News fetched successfully",
      data: news,
      count: news.length,
      limit: limit ? parseInt(limit) : null,
      filters: filters,
    });
  }),
  getNews: asyncHandler(async (req, res) => {
    const news = await newsService.getNews(req.params.id);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "News fetched successfully",
      data: news,
    });
  }),
  updateNews: asyncHandler(async (req, res) => {
    const { title, description, removeBanner } = req.body;
    const banner = req.file ? req.file.path : null;
 
    const updateData = {
      title,
      description,
    };

    // Handle banner updates
    if (banner) {
      // User uploaded a new banner - replace old one
      updateData.banner = banner;
    } else if (removeBanner === 'true' || removeBanner === true) {
      // User wants to remove the banner
      updateData.banner = null;
      updateData.removeBanner = true;
    }
 
    // If neither, keep existing banner (don't include banner field)

    const news = await newsService.updateNews(
      req.params.id,
      updateData
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "News updated successfully",
      data: news,
    });
  }),
  toggleNewsStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    const news = await newsService.toggleNewsStatus(
      req.params.id,
      status
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "News status updated successfully",
      data: news,
    });
  }),
};

export default newsController;
