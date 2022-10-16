import type { Request, Response, NextFunction } from "express";

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers.authorization;

  if (!userId) {
    throw new Error("No userId");
  }
  console.log("userId :", userId);
  next();
};
