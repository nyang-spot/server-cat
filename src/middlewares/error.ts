import type { Request, Response, NextFunction } from "express";

export const errorMiddleware = (_err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ msg: "error test" });
};
