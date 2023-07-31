import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "red",
    warn: "yellow",
    info: "green",
    http: "cyan",
    debug: "blue",
  },
};

const loggerProd = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevels.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../../logs/error.log"),
      level: "info",
    }),
  ],
});

const loggerDev = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevels.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

export const addLogger = (req, res, next) => {
  if (currentEnv === "development") {
    req.logger = loggerDev;
  } else if (currentEnv === "production") {
    req.logger = loggerProd;
  }
  req.logger.http(`${req.method} ${req.url} - ${new Date()}`);
  next();
};

let levelToUse = "null";

let currentEnv = process.env.NODE_ENV || "development";

if (currentEnv === "development") {
  levelToUse = "debug";
} else {
  levelToUse = "warn";
}

export const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    new winston.transports.Console({
      level: levelToUse,
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevels.colors }),
        winston.format.simple()
      ),
    }),
  ],
});
