import "dotenv/config";
import app from "./app";
import mongoose from "mongoose";
import Redis from "ioredis";

const connectDB = async () => {
  try {
    // await  mongoose.connect('mongodb://localhost:27017/enchante')
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

connectDB();
const redisClient = new Redis({
  host: 'redis',
  port: 6379,
});

// Function to get data from cache
export async function getFromCache(key: string): Promise<any> {
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  } catch (error) {
    // Handle error
    console.error('Error while getting data from cache:', error);
    return null;
  }
}

// Function to set data in cache
export async function setInCache(key: string, data: any, expiresInSeconds?: number): Promise<void> {
  try {
    const value = JSON.stringify(data);
    if (expiresInSeconds && expiresInSeconds > 0) {
      await redisClient.set(key, value, 'EX', expiresInSeconds);
    } else {
      await redisClient.set(key, value);
    }
  } catch (error) {
    // Handle error
    console.error('Error while setting data in cache:', error);
  }
}


const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));