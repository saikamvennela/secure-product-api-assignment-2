import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import productRoutes from "./routes/productRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { AppError } from "./utils/AppError";
import logger from "./config/logger";

const app = express();

const PORT = 5000;

// Helmet security middleware
app.use(helmet());

// Maximum request body = 10 KB
app.use(express.json({ limit: "10kb" }));

// Rate limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50,

  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

// Apply rate limiter to API routes
app.use("/api/v1", limiter);

// Morgan HTTP logging connected to Winston
const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  }
};

// Morgan DEV mode
app.use(
  morgan("dev", {
    stream: morganStream
  })
);

// Product API
app.use("/api/v1/products", productRoutes);

// Catch-all unknown route handler
app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
});

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});