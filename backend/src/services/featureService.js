import Feature from "../models/Feature.js";
import { getCloudinaryPublicId } from "../utils/getPublicId.js";
import cloudinary from "../config/cloudinaryConfig.js";

const featureService = {
  createFeature: async (name, description, banner) => {
    const feature = await Feature.create({ name, description, banner });
    return feature;
  },
  getFeatures: async (limit = null, filters = {}) => {
    let query = Feature.find(filters).sort({ createdAt: -1 });

    if (limit && limit > 0) {
      query = query.limit(parseInt(limit));
    }

    const features = await query;
    return features;
  },
  getFeature: async (id) => {
    const feature = await Feature.findById(id);
    return feature;
  },
  updateFeature: async (id, data) => {
    const feature = await Feature.findById(id);

    // Handle banner deletion scenarios
    if (feature.banner) {
      if (data.banner) {
        // Scenario 1: User uploaded a new banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(feature.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted old banner with public ID: ${publicId}`);
      } else if (data.removeBanner) {
        // Scenario 2: User clicked X to remove banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(feature.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Removed banner with public ID: ${publicId}`);
      }
      // Scenario 3: Neither data.banner nor data.removeBanner - keep existing banner
    }

    // Remove removeBanner flag from update data as it's not a model field
    const { removeBanner, ...updateData } = data;

    const result = await Feature.findByIdAndUpdate(id, updateData, { new: true });
    return result;
  },
  toggleFeatureStatus: async (id, status) => {
    const feature = await Feature.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true }
    );
    return feature;
  },
};

export default featureService;
