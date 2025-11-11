import User from '../models/User.js';
import tokenService from './tokenService.js';
import emailService from './emailService.js';
import { MESSAGES } from '../utils/constants.js';

const authService = {
  // Register new user
  register: async (userData) => {
    const { email, password, firstName, lastName } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error(MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    // Create new user
    const user = new User({
      email,
      password,
      firstName,
      lastName
    });

    // Generate verification token
    const verificationToken = tokenService.generateVerificationToken();
    user.verificationToken = verificationToken;
    user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await user.save();

    // Send verification email
    await emailService.sendVerificationEmail(email, firstName, verificationToken);

    return {
      message: MESSAGES.REGISTRATION_SUCCESS,
      user: user.toJSON()
    };
  },

  // Login user
  login: async (email, password) => {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(MESSAGES.INVALID_CREDENTIALS);
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error(MESSAGES.INVALID_CREDENTIALS);
    }

    // Check if email is verified
    if (!user.isVerified) {
      throw new Error(MESSAGES.EMAIL_NOT_VERIFIED);
    }

    // Generate tokens
    const { accessToken, refreshToken } = await tokenService.generateTokenPair(user);

    return {
      message: MESSAGES.LOGIN_SUCCESS,
      user: user.toJSON(),
      accessToken,
      refreshToken
    };
  },

  // Logout user (delete refresh token)
  logout: async (refreshToken) => {
    if (refreshToken) {
      await tokenService.deleteRefreshToken(refreshToken);
    }
    return { message: MESSAGES.LOGOUT_SUCCESS };
  },

  // Refresh access token
  refreshAccessToken: async (refreshToken) => {
    // Verify refresh token
    const decoded = tokenService.verifyRefreshToken(refreshToken);
    
    // Check if refresh token exists in database
    const storedToken = await tokenService.findRefreshToken(refreshToken);
    if (!storedToken) {
      throw new Error(MESSAGES.INVALID_TOKEN);
    }

    // Generate new access token
    const payload = tokenService.createTokenPayload(storedToken.user);
    const accessToken = tokenService.generateAccessToken(payload);

    return {
      accessToken,
      user: storedToken.user.toJSON()
    };
  },

  // Verify email
  verifyEmail: async (verificationToken) => {
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw new Error(MESSAGES.INVALID_TOKEN);
    }

    // Check if token is expired
    if (user.verificationTokenExpires < new Date()) {
      throw new Error(MESSAGES.TOKEN_EXPIRED);
    }

    // Update user
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return {
      message: MESSAGES.EMAIL_VERIFIED,
      user: user.toJSON()
    };
  },

  // Request password reset
  requestPasswordReset: async (email) => {
   
    const user = await User.findOne({ email });
  
    if (!user) {
      // Don't reveal if email exists or not
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    // Generate reset token
    const resetToken = tokenService.generatePasswordResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save();

    // Send reset email
    await emailService.sendPasswordResetEmail(email, user.firstName, resetToken);

    return { message: MESSAGES.PASSWORD_RESET_SENT };
  },

  // Reset password
  resetPassword: async (resetToken, newPassword) => {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      throw new Error(MESSAGES.INVALID_TOKEN);
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    // Delete all refresh tokens for security
    await tokenService.deleteAllRefreshTokens(user._id);

    return {
      message: MESSAGES.PASSWORD_RESET_SUCCESS,
      user: user.toJSON()
    };
  },

  // Get user profile
  getUserProfile: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }
    return user.toJSON();
  },

  // Update user profile
  updateUserProfile: async (userId, updateData) => {
    const allowedUpdates = ['firstName', 'lastName', 'email'];
    const updates = {};

    // Filter allowed updates
    Object.keys(updateData).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = updateData[key];
      }
    });

    // Get current user data to compare email
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    // If email is being updated and it's different from current email, generate new verification token
    if (updates.email && updates.email !== currentUser.email) {
      updates.isVerified = false;
      updates.verificationToken = tokenService.generateVerificationToken();
      updates.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    // Send verification email if email was actually changed
    if (updates.email && updates.email !== currentUser.email && updates.verificationToken) {
      await emailService.sendVerificationEmail(user.email, user.firstName, updates.verificationToken);
    }

    return user.toJSON();
  },

  // Change password
  changePassword: async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    // Verify old password
    const isOldPasswordValid = await user.comparePassword(oldPassword);
    if (!isOldPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Update password (will be hashed by the pre-save middleware)
    user.password = newPassword;
    await user.save();

    // Delete all refresh tokens for security
    await tokenService.deleteAllRefreshTokens(userId);

    return {
      message: 'Password changed successfully',
      user: user.toJSON()
    };
  }
};

export default authService;