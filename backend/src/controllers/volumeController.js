import { asyncHandler } from "../middlewares/errorHandler.js";
import volumeService from "../services/volumeService.js";
import { STATUS_CODES } from "../utils/constants.js";

const volumeController = {
  createVolume: asyncHandler(async (req, res) => {
    const volumeData = req.body;
    const volume = await volumeService.createVolume(volumeData);
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
      message: "Volume fetched successfully",
      data: volume,
    });
  }),

  updateVolume: asyncHandler(async (req, res) => {
    const volume = await volumeService.updateVolume(req.params.id, req.body);
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

  deleteVolume: asyncHandler(async (req, res) => {
    const volume = await volumeService.deleteVolume(req.params.id);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Volume deleted successfully",
      data: volume,
    });
  }),
};

export default volumeController;
