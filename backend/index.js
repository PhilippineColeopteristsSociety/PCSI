import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./src/config/database.js";
import { errorHandler, notFound } from "./src/middlewares/errorHandler.js";
import { validateApiKey } from "./src/middlewares/apiKeyMiddleware.js";
import emailService from "./src/services/emailService.js";

// Import routes
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import publicationRoutes from "./src/routes/publicationRoutes.js";
import announcementRoutes from "./src/routes/announcementRoutes.js";
import featureRoutes from "./src/routes/featureRoutes.js";

const app = express();

// Connect to database
connectDB();

// CORS configuration to support multiple origins
const allowedOrigins = process.env.CLIENT_URLS 
  ? process.env.CLIENT_URLS.split(',').map(url => url.trim())
  : [
      process.env.CLIENT_URL,
      'http://localhost:3000',
      'http://localhost:5173',
    ];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Render health checks)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // Log the blocked origin for debugging
        console.log(`CORS blocked origin: ${origin}`);
        console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Test email configuration on startup (only if email is configured)
if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  emailService.testEmailConfiguration();
} else {
  console.log('Email service: Not configured - skipping email test');
}

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PCSI Backend API is running",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth",
      users: "/api/users",
      publications: "/api/publications",
      announcements: "/api/announcements",
      features: "/api/features"
    }
  });
});

// Health check endpoint (no API key required)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PCSI Backend API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Apply API key middleware to all other API routes
app.use("/api", validateApiKey);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/features", featureRoutes);
// Handle 404 for undefined routes
app.use(notFound);

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`PCSI Backend Server running on port ${PORT}`);
  console.log(
    `Email service: ${process.env.EMAIL_HOST ? "Configured" : "Not configured"}`
  );
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  process.exit(0);
});
