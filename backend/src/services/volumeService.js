import Volume from "../models/Volume.js";
import { getCloudinaryPublicId } from "../utils/getPublicId.js";
import cloudinary from "../config/cloudinaryConfig.js";
import mongoose from "mongoose";

const volumeService = {
  createVolume: async (volumeNo, seriesNo, month, year, doi, banner) => {
    const volume = await Volume.create({
      volumeNo,
      seriesNo,
      month,
      year,
      doi,
      banner,
    });
    return volume;
  },
  getVolumes: async (limit = null, filters = {}) => {
    // Adjust filter for status to support both string "1" and numeric 1
    if (filters.status === "1" || filters.status === 1) {
      filters.status = { $in: ["1", 1] };
    }

    console.log("Volume filter applied:", filters);

    let query = Volume.find(filters).sort({ createdAt: -1 });

    if (limit && limit > 0) {
      query = query.limit(parseInt(limit));
    }

    const volumes = await query;
    console.log("Volumes returned:", volumes.length);
    return volumes;
  },
  getVolume: async (id) => {
    const volume = await Volume.findById(id);
    return volume;
  },
  updateVolume: async (id, data) => {
    const objectId = new mongoose.Types.ObjectId(id);

    // Fetch existing volume
    const volume = await Volume.findById(objectId);
    if (!volume) {
      throw new Error("Volume not found");
    }

    // Build uniqueness check conditions only for fields that are being changed
    const orConditions = [];
    if (data.doi && data.doi !== volume.doi) {
      orConditions.push({ doi: data.doi });
    }
    if (data.volumeNo !== undefined && data.volumeNo !== volume.volumeNo) {
      orConditions.push({ volumeNo: data.volumeNo });
    }

    if (orConditions.length > 0) {
      const existingVolume = await Volume.findOne({
        $or: orConditions,
        _id: { $ne: objectId },
      });
      if (existingVolume) {
        throw new Error("Volume No. or DOI already exists");
      }
    }

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

    const result = await Volume.findByIdAndUpdate(objectId, updateData, {
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
