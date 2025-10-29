import express from 'express';
import announcementController from '../controllers/announcementController.js';
import { verifyToken} from '../middlewares/authMiddleware.js';
import { validateAnnouncement } from '../middlewares/validation.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/', upload.single('image'), announcementController.createAnnouncement);
router.get('/',  announcementController.getAnnouncements);
router.get('/:id',  announcementController.getAnnouncement);
router.put('/:id', verifyToken, validateAnnouncement, announcementController.updateAnnouncement);
router.patch('/:id/status', verifyToken, announcementController.toggleAnnouncementStatus);

export default router;