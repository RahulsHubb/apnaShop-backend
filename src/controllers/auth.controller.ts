import { Request, Response } from "express";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req: Request, res: Response) => {
  // fake user
  const user = { id: "123", role: "user" };

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  res.json({ token });
};
