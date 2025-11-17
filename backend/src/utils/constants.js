// User roles
const ROLES = {
  USER: "user",
  ADMIN: "admin",
};

// Token types
const TOKEN_TYPES = {
  ACCESS: "access",
  REFRESH: "refresh",
  VERIFICATION: "verification",
  PASSWORD_RESET: "password_reset",
};

// Email templates
const EMAIL_TEMPLATES = {
  VERIFICATION: "verification",
  PASSWORD_RESET: "password_reset",
};

// API response messages
const MESSAGES = {
  // Auth messages
  REGISTER_SUCCESS: "User registered successfully. Please verify your email.",
  LOGIN_SUCCESS: "Login successful",
  LOGOUT_SUCCESS: "Logout successful",
  EMAIL_VERIFIED: "Email verified successfully",
  PASSWORD_RESET_SENT: "Password reset email sent",
  PASSWORD_RESET_SUCCESS: "Password reset successful",

  // Error messages
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  EMAIL_NOT_VERIFIED: "Please verify your email before logging in",
  INVALID_TOKEN: "Invalid or expired token",
  USER_NOT_FOUND: "User not found",
  VOLUME_NOT_FOUND: "Volume not found",
  TOKEN_EXPIRED: "Token has expired",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access forbidden",
  INVALID_API_KEY: "Invalid API key",
  MISSING_API_KEY: "API key is required",

  // Validation messages
  REQUIRED_FIELD: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  PASSWORD_TOO_SHORT: "Password must be at least 6 characters long",
  NAME_TOO_LONG: "Name cannot exceed 50 characters",
};

// HTTP status codes
const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export { ROLES, TOKEN_TYPES, EMAIL_TEMPLATES, MESSAGES, STATUS_CODES };
