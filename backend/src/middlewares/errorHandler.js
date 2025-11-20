import { MESSAGES, STATUS_CODES } from '../utils/constants.js';

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error:', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: STATUS_CODES.NOT_FOUND };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    error = { message, statusCode: STATUS_CODES.CONFLICT };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: STATUS_CODES.BAD_REQUEST };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = MESSAGES.INVALID_TOKEN;
    error = { message, statusCode: STATUS_CODES.UNAUTHORIZED };
  }

  if (err.name === 'TokenExpiredError') {
    const message = MESSAGES.TOKEN_EXPIRED;
    error = { message, statusCode: STATUS_CODES.UNAUTHORIZED };
  }

  // Default to 500 server error
  const statusCode = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = error.message || MESSAGES.INTERNAL_SERVER_ERROR || 'Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// 404 handler for undefined routes
const notFound = (req, res, next) => {
  res.status(STATUS_CODES.NOT_FOUND).json({
    success: false,
    message: `Route not found - ${req.originalUrl}`,
    statusCode: STATUS_CODES.NOT_FOUND
  });
};

// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export {
  errorHandler,
  notFound,
  asyncHandler
};
