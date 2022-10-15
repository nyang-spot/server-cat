import type { Response, NextFunction, Request } from "express";

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.json({ message: err.message });
  } else {
    next();
  }
};
