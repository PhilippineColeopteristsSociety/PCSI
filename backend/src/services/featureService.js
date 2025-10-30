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

    if (feature.banner) {
      // If no new banner provided, retain existing banner
      const publicId = `pcsi/${getCloudinaryPublicId(feature.banner)}`;
      await cloudinary.uploader.destroy(publicId);
      console.log(`Deleted old banner with public ID: ${publicId}`);
    }

    const result= await Feature.findByIdAndUpdate(id, data, { new: true });
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
