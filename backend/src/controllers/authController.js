import authService from "../services/authService.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { STATUS_CODES } from "../utils/constants.js";

const authController = {
  // Register new user
  register: asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    const result = await authService.register({
      email,
      password,
      firstName,
      lastName,
    });

    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
      },
    });
  }),

  // Login user
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  }),

  // Logout user
  logout: asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    const result = await authService.logout(refreshToken);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: result.message,
    });
  }),

  // Refresh access token
  refreshToken: asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    const result = await authService.refreshAccessToken(refreshToken);

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
    });
  }),

  // Verify email
  verifyEmail: asyncHandler(async (req, res) => {
    const { token } = req.params;

    const result = await authService.verifyEmail(token);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
      },
    });
  }),
  // Send OTP for email change
  sendChangeEmailOTP: asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await authService.sendChangeEmailOTP(email);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: result.message,
      data: {
        token: result.token,
      },
    });
  }),

  // Validate OTP
  validateOTP: asyncHandler(async (req, res) => {
    const { token, otp } = req.body;

    const result = await authService.validateOTP(token, otp);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
      },
    });
  }),
  // Send OTP for email change
  sendChangeEmailOTP: asyncHandler(async (req, res) => {
    const { email } = req.body;
    const result = await authService.sendChangeEmailOTP(email);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: result.message,
      data:{
        token: result.token
      }
    });
  }),

  // Validate OTP
  validateOTP: asyncHandler(async (req, res) => {
    const { token, otp } = req.body;

    const result = await authService.validateOTP(token, otp);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: result.message,
      data: {
        user: result.user
      }
    });
  }),

  // Request password reset
  requestPasswordReset: asyncHandler(async (req, res) => {
    const { email } = req.body;

    const result = await authService.requestPasswordReset(email);
    
    res.status(STATUS_CODES.OK).json({
      success: true,
      message: result.message,
      data:{
        token: result.token
      }
    });
  }),

  // Reset password
  resetPassword: asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const result = await authService.resetPassword(token, password);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: result.message,
      data: {
        user: result.user,
      },
    });
  }),

  // Get current user info (for token verification)
  getMe: asyncHandler(async (req, res) => {
    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        user: req.user,
      },
    });
  }),
};

export default authController;
