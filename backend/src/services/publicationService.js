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

    if (publication.banner) {
      // If no new banner provided, retain existing banner
      const publicId = `pcsi/${getCloudinaryPublicId(publication.banner)}`;
      await cloudinary.uploader.destroy(publicId);
      console.log(`Deleted old banner with public ID: ${publicId}`);
    }

    const result = await Publication.findByIdAndUpdate(id, data, { new: true });
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
