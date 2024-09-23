import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const MONGO_URL = process.env.MONGO_URL

const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
    return db;
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
};

export default connectDB;