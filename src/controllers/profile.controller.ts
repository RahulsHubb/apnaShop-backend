import { Request, Response } from "express";
import { User } from "../models/user.model.js";

export const getProfile = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      id: 1,
      name: "John Doe",
      email: "",
    },
  });
};
