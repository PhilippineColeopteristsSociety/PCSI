import authService from "../services/authService.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { STATUS_CODES } from "../utils/constants.js";

const userController = {
  // Get user profile
  getProfile: asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const user = await authService.getUserProfile(userId);

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        user,
      },
    });
  }),

  // Update user profile
  updateProfile: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const updateData = req.body;

    const user = await authService.updateUserProfile(userId, updateData);

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user,
      },
    });
  }),

  // Get all users (admin only)
  getAllUsers: asyncHandler(async (req, res) => {
    const User = (await import("../models/User.js")).default;

    const users = await User.find(
      {},
      "-password -verificationToken -resetPasswordToken -resetPasswordExpires"
    ).sort({ createdAt: -1 });

    res.status(STATUS_CODES.OK).json({
      success: true,
      count: users.length,
      data: {
        users,
      },
    });
  }),

  // Get user by ID (admin only)
  getUserById: asyncHandler(async (req, res) => {
    const User = (await import("../models/User.js")).default;
    const { userId } = req.params;

    const user = await User.findById(
      userId,
      "-password -verificationToken -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      data: {
        user,
      },
    });
  }),

  // Update user role (admin only)
  updateUserRole: asyncHandler(async (req, res) => {
    const User = (await import("../models/User.js")).default;
    const { userId } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Invalid role. Must be either "user" or "admin"',
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true, runValidators: true }
    ).select(
      "-password -verificationToken -resetPasswordToken -resetPasswordExpires"
    );

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "User role updated successfully",
      data: {
        user,
      },
    });
  }),

  // Delete user (admin only)
  deleteUser: asyncHandler(async (req, res) => {
    const User = (await import("../models/User.js")).default;
    const RefreshToken = (await import("../models/RefreshToken.js")).default;
    const { userId } = req.params;

    // Check if trying to delete own account
    if (userId === req.user._id.toString()) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete all refresh tokens for this user
    await RefreshToken.deleteMany({ user: userId });

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "User deleted successfully",
    });
  }),

  // Change password
  changePassword: asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { oldPassword, newPassword } = req.body;

    const result = await authService.changePassword(
      userId,
      oldPassword,
      newPassword
    );

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: "Password changed successfully",
      data: result,
    });
  }),
};

export default userController;
