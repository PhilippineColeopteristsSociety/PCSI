import Publication from "../models/Publication.js";
import { getCloudinaryPublicId } from "../utils/getPublicId.js";
import cloudinary from "../config/cloudinaryConfig.js";

const publicationService = {
  createPublication: async (title, description, banner) => {
    const publication = await Publication.create({
      title,
      description,
      banner,
    });
    return publication;
  },
  getPublications: async (limit = null, filters = {}) => {
    let query = Publication.find(filters).sort({ createdAt: -1 });

    if (limit && limit > 0) {
      query = query.limit(parseInt(limit));
    }

    const publications = await query;
    return publications;
  },
  getPublication: async (id) => {
    const publication = await Publication.findById(id);
    return publication;
  },
  updatePublication: async (id, data) => {
    const publication = await Publication.findById(id);
    // console.log(data)
    // Handle banner deletion scenarios
    if (publication.banner) {
      if (data.banner) {
        // Scenario 1: User uploaded a new banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(publication.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted old banner with public ID: ${publicId}`);
      } else if (data.removeBanner) {
        // Scenario 2: User clicked X to remove banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(publication.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Removed banner with public ID: ${publicId}`);
      }
      // Scenario 3: Neither data.banner nor data.removeBanner - keep existing banner
    }

    // Remove removeBanner flag from update data as it's not a model field
    const { removeBanner, ...updateData } = data;

    const result = await Publication.findByIdAndUpdate(id, updateData, { new: true });
    return result;
  },
  togglePublicationStatus: async (id, status) => {
    const publication = await Publication.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true }
    );
    return publication;
  },
};

export default publicationService;
