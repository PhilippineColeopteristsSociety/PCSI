import { asyncHandler } from "../middlewares/errorHandler.js";
import merchandiseService from "../services/merchandiseService.js";
import { STATUS_CODES } from "../utils/constants.js";

const merchandiseController = {
  createMerchandise: asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const banner = req.file ? req.file.path : null;

    const merchandise = await merchandiseService.createMerchandise(
      name,
      description,
      banner
    );
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Merchandise created successfully",
      data: merchandise,
    });
  }),
  getAllMerchandise: asyncHandler(async (req, res) => {
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

    const merchandise = await merchandiseService.getAllMerchandise(
      limit,
      filters
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Merchandise fetched successfully",
      data: merchandise,
      count: merchandise.length,
      limit: limit ? parseInt(limit) : null,
      filters: filters,
    });
  }),
  getMerchandise: asyncHandler(async (req, res) => {
    const merchandise = await merchandiseService.getMerchandise(req.params.id);
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Merchandise fetched successfully",
      data: merchandise,
    });
  }),
  updateMerchandise: asyncHandler(async (req, res) => {
    const { name, description, removeBanner } = req.body;
    const banner = req.file ? req.file.path : null;
 
    const updateData = {
      name,
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

    const merchandise = await merchandiseService.updateMerchandise(
      req.params.id,
      updateData
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Merchandise updated successfully",
      data: merchandise,
    });
  }),
  toggleMerchandiseStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    const merchandise = await merchandiseService.toggleMerchandiseStatus(
      req.params.id,
      status
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Merchandise status updated successfully",
      data: merchandise,
    });
  }),
};

export default merchandiseController;
