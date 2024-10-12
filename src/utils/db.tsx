import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const Connect = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO as string);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.log({ error });
    throw new Error(error.message || "Connection error");
  }
};
