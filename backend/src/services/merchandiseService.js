import Merchandise from "../models/Merchandise.js";
import { getCloudinaryPublicId } from "../utils/getPublicId.js";
import cloudinary from "../config/cloudinaryConfig.js";

const merchandiseService = {
  createMerchandise: async (name, description, banner) => {
    const merchandise = await Merchandise.create({ name, description, banner });
    return merchandise;
  },
  getAllMerchandise: async (limit = null, filters = {}) => {
    let query = Merchandise.find(filters).sort({ createdAt: -1 });

    if (limit && limit > 0) {
      query = query.limit(parseInt(limit));
    }

    const merchandise = await query;
    return merchandise;
  },
  getMerchandise: async (id) => {
    const merchandise = await Merchandise.findById(id);
    return merchandise;
  },
  updateMerchandise: async (id, data) => {
    const merchandise = await Merchandise.findById(id);

    // Handle banner deletion scenarios
    if (merchandise.banner) {
      if (data.banner) {
        // Scenario 1: User uploaded a new banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(merchandise.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted old banner with public ID: ${publicId}`);
      } else if (data.removeBanner) {
        // Scenario 2: User clicked X to remove banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(merchandise.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Removed banner with public ID: ${publicId}`);
      }
      // Scenario 3: Neither data.banner nor data.removeBanner - keep existing banner
    }

    // Remove removeBanner flag from update data as it's not a model field
    const { removeBanner, ...updateData } = data;

    const result = await Merchandise.findByIdAndUpdate(id, updateData, { new: true });
    return result;
  },
  toggleMerchandiseStatus: async (id, status) => {
    const merchandise = await Merchandise.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true }
    );
    return merchandise;
  },
};

export default merchandiseService;
