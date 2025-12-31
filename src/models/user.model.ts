import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String, // only if email login is enabled
      select: false, // 🔐 do not return by default
    },

    phoneVerified: {
      type: Boolean,
      default: true, // OTP verified at signup
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
