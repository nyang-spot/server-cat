import type { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info({ req, res });
  next();
};
