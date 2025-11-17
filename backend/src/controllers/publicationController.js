import { asyncHandler } from "../middlewares/errorHandler.js";
import publicationService from "../services/publicationService.js";
import { STATUS_CODES } from "../utils/constants.js";

const publicationController = {
  createPublication: asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const banner = req.file ? req.file.path : null;

    const publication = await publicationService.createPublication(
      title,
      description,
      banner
    );
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Publication created successfully",
      data: publication,
    });
  }),
  getPublications: asyncHandler(async (req, res) => {
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

    const publications = await publicationService.getPublications(
      limit,
      filters
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Publications fetched successfully",
      data: publications,
      count: publications.length,
      limit: limit ? parseInt(limit) : null,
      filters: filters,
    });
  }),
  getPublication: asyncHandler(async (req, res) => {
    const publication = await publicationService.getPublication(req.params.id);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Publication fetched successfully",
      data: publication,
    });
  }),
  updatePublication: asyncHandler(async (req, res) => {
    const { title, description, removeBanner } = req.body;
    const banner = req.file ? req.file.path : null; // Get file path from Cloudinary upload

    const updateData = {
      title,
      description,
    };

    // Handle banner updates
    if (banner) {
      // User uploaded a new banner - replace old one
      updateData.banner = banner;
    } else if (removeBanner === "true" || removeBanner === true) {
      // User wants to remove the banner
      updateData.banner = null;
      updateData.removeBanner = true;
    }

    // If neither, keep existing banner (don't include banner field)

    const publication = await publicationService.updatePublication(
      req.params.id,
      updateData
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Publication updated successfully",
      data: publication,
    });
  }),
  togglePublicationStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    const publication = await publicationService.togglePublicationStatus(
      req.params.id,
      status
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Publication status updated successfully",
      data: publication,
    });
  }),
};

export default publicationController;
