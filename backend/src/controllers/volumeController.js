import { asyncHandler } from "../middlewares/errorHandler.js";
import volumeService from "../services/volumeService.js";
import { STATUS_CODES } from "../utils/constants.js";

const volumeController = {
  createVolume: asyncHandler(async (req, res) => {
    const { volumeNo, seriesNo, month, year, doi } = req.body;
    const banner = req.file ? req.file.path : null;

    const volume = await volumeService.createVolume(
      volumeNo,
      seriesNo,
      month,
      year,
      doi,
      banner
    );
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Volume created successfully",
      data: volume,
    });
  }),
  getVolumes: asyncHandler(async (req, res) => {
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

    const volumes = await volumeService.getVolumes(limit, filters);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Volumes fetched successfully",
      data: volumes,
      count: volumes.length,
      limit: limit ? parseInt(limit) : null,
      filters: filters,
    });
  }),
  getVolume: asyncHandler(async (req, res) => {
    const volume = await volumeService.getVolume(req.params.id);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Volumed fetched successfully",
      data: volume,
    });
  }),
  updateVolume: asyncHandler(async (req, res) => {
    const { title, description, removeBanner } = req.body;
    const banner = req.file ? req.file.path : null; // Get file path from Cloudinary upload

    const updateData = {
      volumeNo,
      seriesNo,
      month,
      year,
      doi,
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

    const volume = await volumeService.updateVolume(req.params.id, updateData);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Volume updated successfully",
      data: volume,
    });
  }),
  toggleVolumeStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    const volume = await volumeService.toggleVolumeStatus(
      req.params.id,
      status
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Volume status updated successfully",
      data: volume,
    });
  }),
};

export default volumeController;
