import express from 'express';
import userController from '../controllers/userController.js';
import { verifyToken, requireAdmin, requireVerified } from '../middlewares/authMiddleware.js';
import { validateProfileUpdate } from '../middlewares/validation.js';

const router = express.Router();

// All user routes require authentication
router.use(verifyToken);


router.get('/profile', userController.getProfile);
router.put('/profile', validateProfileUpdate, userController.updateProfile);

router.get('/admin/users', requireAdmin, userController.getAllUsers);
router.get('/admin/users/:userId', requireAdmin, userController.getUserById);
router.put('/admin/users/:userId/role', requireAdmin, userController.updateUserRole);
router.delete('/admin/users/:userId', requireAdmin, userController.deleteUser);

export default router;
