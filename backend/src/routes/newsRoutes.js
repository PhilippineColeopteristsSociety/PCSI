import express from 'express';
import newsController from '../controllers/newsController.js';
import { verifyToken} from '../middlewares/authMiddleware.js';
import { validateNews } from '../middlewares/validation.js';
import upload from '../middlewares/multerMiddleware.js';

const router = express.Router();

router.post('/',verifyToken, upload.single('image'), validateNews, newsController.createNews);
router.get('/',  newsController.getAllNews);
router.get('/:id',  newsController.getNews);
router.put('/:id', verifyToken,upload.single("image"), validateNews, newsController.updateNews);
router.patch('/:id/status', verifyToken, newsController.toggleNewsStatus);

export default router;
