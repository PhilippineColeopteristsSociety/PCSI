import featureService from "../services/featureService.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { STATUS_CODES } from "../utils/constants.js";

const featureController = {
  createFeature: asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const banner = req.file ? req.file.path : null; // Get file path from Cloudinary upload
    const feature = await featureService.createFeature(
      name,
      description,
      banner
    );
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Feature created successfully",
      data: feature,
    });
  }),
  getFeatures: asyncHandler(async (req, res) => {
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

    const features = await featureService.getFeatures(limit, filters);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Features fetched successfully",
      data: features,
      count: features.length,
      limit: limit ? parseInt(limit) : null,
      filters: filters,
    });
  }),
  getFeature: asyncHandler(async (req, res) => {
    const feature = await featureService.getFeature(req.params.id);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Feature fetched successfully",
      data: feature,
    });
  }),
  updateFeature: asyncHandler(async (req, res) => {
    const { name, description, removeBanner } = req.body;
    const banner = req.file ? req.file.path : null; // Get file path from Cloudinary upload

    const updateData = {
      name,
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

    const feature = await featureService.updateFeature(
      req.params.id,
      updateData
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Feature updated successfully",
      data: feature,
    });
  }),
  toggleFeatureStatus: asyncHandler(async (req, res) => {
    const feature = await featureService.toggleFeatureStatus(
      req.params.id,
      req.body.status
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Feature status toggled successfully",
      data: feature,
    });
  }),
};

export default featureController;
