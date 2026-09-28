import winston from "winston";

const logger = winston.createLogger({
  level: "info",

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),

  transports: [
    // Console transport for development
    new winston.transports.Console(),

    // Error logs only
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),

    // All logs
    new winston.transports.File({
      filename: "logs/combined.log"
    })
  ]
});

export default logger;

