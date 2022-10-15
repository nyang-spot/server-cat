import type { Request, Response, NextFunction } from "express";

export const asyncHandler =
  (fn: <T1 extends Request<any, any, any, any>, T2 extends Response<unknown>, T3 = unknown>(req: T1, res: T2, next: T3) => void) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
