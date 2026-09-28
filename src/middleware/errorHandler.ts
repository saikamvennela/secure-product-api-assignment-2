import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import logger from "../config/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = err as AppError;

  const statusCode = error.statusCode || 500;
  const isOperational = error.isOperational ?? false;

  // Log every error with request information
  logger.error({
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: err.stack
  });

  // Handle unexpected/server errors
  if (!isOperational) {
    res.status(500).json({
      success: false,
      message: "Something went wrong on the server."
    });

    return;
  }

  // Handle operational errors
  res.status(statusCode).json({
    success: false,
    message: error.message
  });
};
