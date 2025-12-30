import { Request, Response } from "express";
import { User } from "../models/user.model.js";

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password, name } = req.body;

  const user = await User.create({
    email,
    password,
    name,
  });

  res.status(201).json({
    message: "User created",
    user,
  });
};
