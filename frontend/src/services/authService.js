import api from "@/lib/api";

const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { user, accessToken, refreshToken } = response.data.data;

      // Store tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  },

  // Register user
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  },

  // Logout user
  logout: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  // Refresh access token
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post("/auth/refresh", { refreshToken });
      const { accessToken, user } = response.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Token refresh failed",
      };
    }
  },

  //change email send otp
  sendChangeEmailOTP: async (email) => {
    try {
      const response = await api.post("/auth/send-change-email-otp", { email });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Sending OTP failed",
      };
    }
  },

  validateOTP: async (otpData) => {
    try {
      const response = await api.post("/auth/validate-otp", otpData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "OTP validation failed",
      };
    }
  },

  // Resend OTP
  resendOTP: async (token) => {
    try {
      const response = await api.post("/auth/resend-otp", { token });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to resend OTP",
      };
    }
  },
  // Request password reset
  requestPasswordReset: async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });

      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Password reset request failed",
      };
    }
  },

  // Reset password
  resetPassword: async (token, password) => {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Password reset failed",
      };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to get user data",
      };
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("accessToken");
    return !!token;
  },

  // Get stored user data
  getStoredUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Get stored access token
  getAccessToken: () => {
    return localStorage.getItem("accessToken");
  },
};

export default authService;
