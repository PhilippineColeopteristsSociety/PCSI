import { asyncHandler } from "../middlewares/errorHandler.js";
import announcementService from "../services/announcementService.js";
import { STATUS_CODES } from "../utils/constants.js";

const announcementController = {
  createAnnouncement: asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const banner = req.file ? req.file.path : null; // Get file path from Cloudinary upload

    const announcement = await announcementService.createAnnouncement(
      title,
      description,
      banner
    );
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: "Announcement created successfully",
      data: announcement,
    });
  }),
  getAnnouncements: asyncHandler(async (req, res) => {
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

    const announcements = await announcementService.getAnnouncements(
      limit,
      filters
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Announcements fetched successfully",
      data: announcements,
      count: announcements.length,
      limit: limit ? parseInt(limit) : null,
      filters: filters,
    });
  }),
  getAnnouncement: asyncHandler(async (req, res) => {
    const announcement = await announcementService.getAnnouncement(
      req.params.id
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Announcement fetched successfully",
      data: announcement,
    });
  }),
  updateAnnouncement: asyncHandler(async (req, res) => {
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

    const announcement = await announcementService.updateAnnouncement(
      req.params.id,
      updateData
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Announcement updated successfully",
      data: announcement,
    });
  }),
  toggleAnnouncementStatus: asyncHandler(async (req, res) => {
    const { status } = req.body;
    const announcement = await announcementService.toggleAnnouncementStatus(
      req.params.id,
      status
    );
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Announcement status updated successfully",
      data: announcement,
    });
  }),
};

export default announcementController;
