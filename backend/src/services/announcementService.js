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
    
    if (announcement.banner) {
      // If no new banner provided, retain existing banner
     const publicId = `pcsi/${getCloudinaryPublicId(announcement.banner)}`;
     await cloudinary.uploader.destroy(publicId);
     console.log(`Deleted old banner with public ID: ${publicId}`);
    }

    const result = await Announcement.findByIdAndUpdate(id, data, { new: true });
    return result;
  },
  toggleAnnouncementStatus: async (id, status) => {
    const announcement = await Announcement.findByIdAndUpdate(
      id, 
      { status: status.toLowerCase() }, 
      { new: true }
    );
    return announcement;
  },

};

export default announcementService;