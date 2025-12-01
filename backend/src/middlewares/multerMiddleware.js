import multer from "multer";
import path from "path";
import cloudinary from "../config/cloudinaryConfig.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const timestamp = Date.now();
    const baseName = `${timestamp}_pcsi`;

    const isImage = /jpeg|jpg|png/.test(file.mimetype);
    const isDocument = /pdf|doc|docx/.test(file.mimetype);

    // Decide folder and resource type
    let folder = "pcsi/others";
    let resourceType = "auto"; // Changed from "raw" to "auto" for better handling

    if (isImage) {
      folder = "pcsi/banners";
      resourceType = "image";
    }

    if (isDocument) {
      folder = "pcsi/files";
      resourceType = "raw"; // Use "raw" for documents to ensure proper upload
    }

    // For raw files, preserve the original filename to get proper URLs
    let publicId = baseName;
    if (resourceType === "raw") {
      const ext = path.extname(file.originalname);
      const nameWithoutExt = path.basename(file.originalname, ext);
      // Use timestamp + original filename to avoid conflicts
      publicId = `${timestamp}_${nameWithoutExt}${ext}`;
    }

    return {
      folder,
      public_id: publicId,
      allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
      resource_type: resourceType,
    };
  },
});

// Multer instance
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);

    if (mimetype && extname) return cb(null, true);

    cb(new Error("Only jpg, jpeg, png, pdf, doc, docx are allowed."));
  },
});

export default upload;
