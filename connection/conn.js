import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
  }
};

export default conn;
