import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  res.status(500).json({ message: err.message });
};
