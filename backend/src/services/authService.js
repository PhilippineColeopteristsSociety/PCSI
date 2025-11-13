import User from "../models/User.js";
import tokenService from "./tokenService.js";
import emailService from "./emailService.js";
import { MESSAGES } from "../utils/constants.js";

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
      lastName,
    });

    // Generate verification token
    const verificationToken = tokenService.generateVerificationToken();
    user.verificationToken = verificationToken;
    user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await user.save();

    // Send verification email
    await emailService.sendVerificationEmail(
      email,
      firstName,
      verificationToken
    );

    return {
      message: MESSAGES.REGISTER_SUCCESS,
      user: user.toJSON(),
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
    const { accessToken, refreshToken } = await tokenService.generateTokenPair(
      user
    );

    return {
      message: MESSAGES.LOGIN_SUCCESS,
      user: user.toJSON(),
      accessToken,
      refreshToken,
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
      user: storedToken.user.toJSON(),
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
      user: user.toJSON(),
    };
  },

  // Request password reset
  requestPasswordReset: async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
      // Don't reveal if email exists or not
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    // Generate reset token and OTP
    const resetToken = tokenService.generatePasswordResetToken();
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    
    user.verificationToken = resetToken;
    user.verificationTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    user.otp = otp;
    await user.save();

    // Send reset email with OTP
    await emailService.sendPasswordResetEmail(email, user.firstName, otp);

    return { token: resetToken, message: MESSAGES.PASSWORD_RESET_SENT };
  },

  sendChangeEmailOTP: async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    user.otp = otp;
    await user.save();

    // Send email with OTP
    await emailService.sendChangeEmailOTP(email, user.firstName, otp);

    return {
      message: "Verification code sent to your email",
      token: user.verificationToken
    };
  },

  resendOTP: async (token) => {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });
    if (!user) {
      throw new Error(MESSAGES.INVALID_TOKEN);
    }
    
    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    user.otp = otp;
    await user.save();
    
    // Send reset email with new OTP
    await emailService.sendPasswordResetEmail(
      user.email,
      user.firstName,
      otp
    );

    return {
      token: token,
      message: "OTP resent successfully",
    }
  },
  validateOTP: async (token, otp) => {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });
    console.log(user)
    if (!user) {
      throw new Error(MESSAGES.INVALID_TOKEN);
    }

    if (user.otp !== otp) {
      throw new Error(MESSAGES.INVALID_OTP);
    }

    user.otp = undefined;
    await user.save();

    return {
      message: MESSAGES.OTP_VERIFIED,
      user: user.toJSON(),
    };
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      throw new Error(MESSAGES.INVALID_TOKEN);
    }

    // Update password
    user.password = newPassword;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    // Delete all refresh tokens for security
    await tokenService.deleteAllRefreshTokens(user._id);

    return {
      message: MESSAGES.PASSWORD_RESET_SUCCESS,
      user: user.toJSON(),
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

    // Get current user
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

  
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
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
      throw new Error("Current password is incorrect");
    }

    // Update password (will be hashed by the pre-save middleware)
    user.password = newPassword;
    await user.save();

    // Delete all refresh tokens for security
    await tokenService.deleteAllRefreshTokens(userId);

    return {
      message: "Password changed successfully",
      user: user.toJSON(),
    };
  },
};

export default authService;
