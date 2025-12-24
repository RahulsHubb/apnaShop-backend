import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, _: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
