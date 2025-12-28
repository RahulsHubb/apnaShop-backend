import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

export const connectDb = async () => {
    console.log('MONGO_URI =', process.env.MONGO_URI)
    try {

        await mongoose.connect(process.env.MONGO_URI || "");
        console.log("DB connected")
    } catch (error) {
        console.log("Error, DB connection failed")
        console.log(error);
        process.exit(1);
    }
}