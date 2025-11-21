import Volume from "../models/Volume.js";
import { getCloudinaryPublicId } from "../utils/getPublicId.js";
import cloudinary from "../config/cloudinaryConfig.js";

const volumeService = {
  createVolume: async (title, description, banner) => {
    const volume = await Volume.create({
      title,
      description,
      banner,
    });
    return volume;
  },
  getVolumes: async (limit = null, filters = {}) => {
    let query = Volume.find(filters).sort({ createdAt: -1 });

    if (limit && limit > 0) {
      query = query.limit(parseInt(limit));
    }

    const volumes = await query;
    return volumes;
  },
  getVolume: async (id) => {
    const volume = await Volume.findById(id);
    return volume;
  },
  updateVolume: async (id, data) => {
    const volume = await Volume.findById(id);
    // console.log(data)
    // Handle banner deletion scenarios
    if (volume.banner) {
      if (data.banner) {
        // Scenario 1: User uploaded a new banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(volume.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted old banner with public ID: ${publicId}`);
      } else if (data.removeBanner) {
        // Scenario 2: User clicked X to remove banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(volume.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Removed banner with public ID: ${publicId}`);
      }
      // Scenario 3: Neither data.banner nor data.removeBanner - keep existing banner
    }

    // Remove removeBanner flag from update data as it's not a model field
    const { removeBanner, ...updateData } = data;

    const result = await Volume.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return result;
  },
  toggleVolumeStatus: async (id, status) => {
    console.log(id);
    const volume = await Volume.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true }
    );
    return volume;
  },
};

export default volumeService;
