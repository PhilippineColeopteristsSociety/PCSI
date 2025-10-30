import multer from 'multer';
import path from 'path';
import cloudinary from '../config/cloudinaryConfig.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pcsi', // Folder name on Cloudinary
    public_id: (req, file) => {
      // Create custom file name with timestamp and pcsi_image prefix
      const timestamp = Date.now();
      const fileName = `${timestamp}_pcsi_image`;
      return fileName;
    },
    allowed_formats: ['jpg', 'jpeg', 'png'], // Only allow these formats
  },
});

// Create multer instance with the storage configuration
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10 MB
  fileFilter: (req, file, cb) => {
    // Allow only jpeg, jpg, and png file types
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      cb(null, true); // File is valid
    } else {
      cb(new Error('Only .jpg, .jpeg, .png, .pdf, .doc, and .docx files are allowed!')); // Reject the file
    }
  }
});
export default upload;
