import mongoose from "mongoose";
import { time } from "node:console";

const userSchema = new mongoose.Schema(
    {
        email:{type:'string', required:true, unique:true},
        password:{type:'string', required:true},
        name:{type:'string', required:true},
    }
);
export const User = mongoose.model("User", userSchema);