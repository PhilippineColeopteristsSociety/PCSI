import cloudinary from '../config/cloudinaryConfig.js';
import Announcement from '../models/Announcement.js';
import { getCloudinaryPublicId } from '../utils/getPublicId.js';

const announcementService = {
  createAnnouncement: async (title, description, banner) => {
    const announcement = await Announcement.create({ title, description, banner });
    return announcement;
  },
  getAnnouncements: async (limit = null, filters = {}) => {
    let query = Announcement.find(filters).sort({ createdAt: -1 });
    
    if (limit && limit > 0) {
      query = query.limit(parseInt(limit));
    }
    
    const announcements = await query;
    return announcements;
  },
  getAnnouncement: async (id) => {
    const announcement = await Announcement.findById(id);
    return announcement;
  },
  updateAnnouncement: async (id, data) => {
    const announcement = await Announcement.findById(id);
    
    // Handle banner deletion scenarios
    if (announcement.banner) {
      if (data.banner) {
        // Scenario 1: User uploaded a new banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(announcement.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Deleted old banner with public ID: ${publicId}`);
      } else if (data.removeBanner) {
        // Scenario 2: User clicked X to remove banner - delete old banner
        const publicId = `pcsi/${getCloudinaryPublicId(announcement.banner)}`;
        await cloudinary.uploader.destroy(publicId);
        console.log(`Removed banner with public ID: ${publicId}`);
      }
      // Scenario 3: Neither data.banner nor data.removeBanner - keep existing banner
    }

    // Remove removeBanner flag from update data as it's not a model field
    const { removeBanner, ...updateData } = data;

    const result = await Announcement.findByIdAndUpdate(id, updateData, { new: true });
    return result;
  },
  toggleAnnouncementStatus: async (id, status) => {
    console.log(id)
    const announcement = await Announcement.findByIdAndUpdate(
      id, 
      { status: status.toLowerCase() }, 
      { new: true }
    );
    return announcement;
  },

};

export default announcementService;