import volumeService from "../services/volumeService.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { STATUS_CODES } from "../utils/constants.js";

const volumeController = {
  // Get all volumes
  getAllVolumes: asyncHandler(async (req, res) => {
    const volumes = await volumeService.getAllVolumes();

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        volumes,
      },
    });
  }),

  // Get volume by ID
  getVolumeById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const volume = await volumeService.getVolumeById(id);

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        volume,
      },
    });
  }),

  // Create new volume
  createVolume: asyncHandler(async (req, res) => {
    const volumeData = req.body;
    const volume = await volumeService.createVolume(volumeData);

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Volume created successfully",
      data: {
        volume,
      },
    });
  }),

  // Update volume
  updateVolume: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const volume = await volumeService.updateVolume(id, updateData);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Volume updated successfully",
      data: {
        volume,
      },
    });
  }),

  // Delete volume
  deleteVolume: asyncHandler(async (req, res) => {
    const { id } = req.params;
    await volumeService.deleteVolume(id);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Volume deleted successfully",
    });
  }),
};

export default volumeController;
