import Volume from "../models/Volume.js";
import { MESSAGES } from "../utils/constants.js";

const volumeService = {
  // Get all volumes
  getAllVolumes: async () => {
    const volumes = await Volume.find().sort({ createdAt: -1 });
    return volumes;
  },

  // Get volume by ID
  getVolumeById: async (id) => {
    const volume = await Volume.findById(id);
    if (!volume) {
      throw new Error(MESSAGES.VOLUME_NOT_FOUND);
    }
    return volume;
  },

  // Create new volume
  createVolume: async (volumeData) => {
    const volume = new Volume(volumeData);
    await volume.save();
    return volume;
  },

  // Update volume
  updateVolume: async (id, updateData) => {
    const volume = await Volume.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!volume) {
      throw new Error(MESSAGES.VOLUME_NOT_FOUND);
    }

    return volume;
  },

  // Delete volume
  deleteVolume: async (id) => {
    const volume = await Volume.findByIdAndDelete(id);
    if (!volume) {
      throw new Error(MESSAGES.VOLUME_NOT_FOUND);
    }
    return volume;
  },
};

export default volumeService;
