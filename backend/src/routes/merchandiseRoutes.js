import express from 'express';
import merchandiseController from '../controllers/merchandiseController.js';
import { verifyToken} from '../middlewares/authMiddleware.js';
import { validateMerchandise } from '../middlewares/validation.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/',verifyToken, upload.single('image'), validateMerchandise, merchandiseController.createMerchandise);
router.get('/',  merchandiseController.getAllMerchandise);
router.get('/:id',  merchandiseController.getMerchandise);
router.put('/:id', verifyToken,upload.single("image"), validateMerchandise, merchandiseController.updateMerchandise);
router.patch('/:id/status', verifyToken, merchandiseController.toggleMerchandiseStatus);

export default router;
