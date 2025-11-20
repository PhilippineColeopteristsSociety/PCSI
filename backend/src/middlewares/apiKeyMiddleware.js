import { MESSAGES, STATUS_CODES } from '../utils/constants.js';
import dotenv from "dotenv";
dotenv.config();

// API Key validation middleware
export const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.headers['api-key'];
  
  if (!apiKey) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.MISSING_API_KEY,
      error: 'Missing API key in headers'
    });
  }

  const validApiKey = process.env.API_KEY;
  
  if (!validApiKey) {
    console.error('API_KEY not configured in environment variables');
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Server configuration error',
      error: 'API key not configured'
    });
  }

  if (apiKey !== validApiKey) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.INVALID_API_KEY,
      error: 'API key does not match'
    });
  }

  next();
};

// Optional API key validation (doesn't fail if no key provided)
export const optionalApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.headers['api-key'];
  
  if (!apiKey) {
    return next(); // Continue without API key
  }

  const validApiKey = process.env.API_KEY;
  
  if (!validApiKey) {
    console.error('API_KEY not configured in environment variables');
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Server configuration error',
      error: 'API key not configured'
    });
  }

  if (apiKey !== validApiKey) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.INVALID_API_KEY,
      error: 'API key does not match'
    });
  }

  next();
};
