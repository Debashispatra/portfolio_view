import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
let mongoConnect=mongoose.connect(process.env.MONGODB_CLOUD_URL)

export default mongoConnect