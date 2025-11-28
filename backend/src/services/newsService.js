import News from "../models/News.js";
import { getCloudinaryPublicId } from "../utils/getPublicId.js";
import cloudinary from "../config/cloudinaryConfig.js";

const newsService = {
  createNews: async (title, description, banner) => {
    const news = await News.create({
      title,
      description,
      banner,
    });
    return news;
  },
  getAllNews: async (limit = null, filters = {}) => {
    let query = News.find(filters).sort({ createdAt: -1 });

    if (limit && limit > 0) {
      query = query.limit(parseInt(limit));
    }

    const news = await query;
    return news;
  },
  getNews: async (id) => {
    const news = await News.findById(id);
    return news;
  },
  updateNews: async (id, data) => {
    const news = await News.findById(id);
    
    // Handle banner deletion scenarios
    if (news.banner) {
      if (data.banner) {
        // Scenario 1: User uploaded a new banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(news.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted old banner with public ID: ${publicId}`);
      } else if (data.removeBanner) {
        // Scenario 2: User clicked X to remove banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(news.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Removed banner with public ID: ${publicId}`);
      }
      // Scenario 3: Neither data.banner nor data.removeBanner - keep existing banner
    }

    // Remove removeBanner flag from update data as it's not a model field
    const { removeBanner, ...updateData } = data;

    const result = await News.findByIdAndUpdate(id, updateData, { new: true });
    return result;
  },
  toggleNewsStatus: async (id, status) => {
    const news = await News.findByIdAndUpdate(
      id,
      { status: status.toLowerCase() },
      { new: true }
    );
    return news;
  },
};

export default newsService;
