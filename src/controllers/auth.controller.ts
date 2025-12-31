import { Request, Response } from "express";
import { generateToken } from "../utils/generateToken.js";
import { generateOTP } from "../utils/common.utils.js";
import otpModel from "../models/otp.model.js";
import { User } from "../models/user.model.js";

export const login = async (req: Request, res: Response) => {
  // fake user
  const user = { id: "123", role: "user" };

  const token = generateToken({
    userId: user.id,
    role: user.role,
  });

  res.status(200).json({ token });
};

export const sendOtp = async (req: Request, res: Response) => {
  const { phone } = req.body;
  const otp = generateOTP();

  await otpModel.deleteMany({ phone });

  await otpModel.create({
    phone,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });
  console.log(otp);
  return res.status(200).json({ message: "otp sent successfully", otp });
};

export const verifyOtp = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ message: "Expecting otp for verification." });
  }
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).json({
      message: "Expecting otp and Phone number for verification.",
    });
  }
  const record = await otpModel.findOne({ phone, otp });
  if (!record) {
    return res.status(204).json({ message: "Invalid or Expired OTP." });
  }
  let user = await User.findOne({ phone });
  let msg = "Welcome Back!";

  if (!user) {
    user = await User.create({ phone, phoneVerified: true });
    msg =
      "Hi, We are Mr Dewal Garments, Welcome to the family! As a thank you for joining, here is a 10% discount on your first order. Use code: WELCOME10.";
  }
  const token = generateToken(user);

  return res.status(200).json({ message: msg, token });
};
