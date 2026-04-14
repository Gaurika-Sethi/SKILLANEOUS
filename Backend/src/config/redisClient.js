import { createClient } from "redis";

let redisAvailable = true;

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on("error", (err) => {
  console.log("Redis Client Error:", err.message);
  redisAvailable = false;
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Redis connected");
    }
  } catch (err) {
    console.log("Redis not available, continuing without cache");
    redisAvailable = false;
  }
};

export { redisClient, connectRedis, redisAvailable };