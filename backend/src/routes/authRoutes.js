import express from 'express';
import authController from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  validateRegister,
  validateLogin,
  validatePasswordResetRequest,
  validatePasswordReset,
  validateRefreshToken
} from '../middlewares/validation.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/logout', validateRefreshToken, authController.logout);
router.post('/refresh', validateRefreshToken, authController.refreshToken);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/forgot-password', validatePasswordResetRequest, authController.requestPasswordReset);
router.post('/validate-otp', authController.validateOTP);
router.post('/reset-password/:token', validatePasswordReset, authController.resetPassword);
router.post('/send-change-email-otp', authController.sendChangeEmailOTP);
router.post("/resend-otp", authController.resendOTP);
// Protected routes (authentication required)
router.get('/me', verifyToken, authController.getMe);

export default router;
