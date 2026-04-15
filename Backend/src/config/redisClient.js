import { createClient } from "redis";
import { Redis as UpstashRedis } from "@upstash/redis";

let redisAvailable = true;
let redisClient = null;
let isUpstash = false;

// 🔀 Decide which Redis to use
if (process.env.USE_UPSTASH_REDIS === "true") {
  try {
    redisClient = new UpstashRedis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    });

    isUpstash = true;
    console.log("Using Upstash Redis");
  } catch (err) {
    console.log("Upstash init failed, falling back to local Redis");
    redisAvailable = false;
  }
} else {
  redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
  });

  redisClient.on("error", (err) => {
    console.log("Redis Client Error:", err.message);
    redisAvailable = false;
  });
}

// 🔌 Connect (only for local Redis)
const connectRedis = async () => {
  if (isUpstash) return; // Upstash doesn't need connect()

  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Local Redis connected");
    }
  } catch (err) {
    console.log("Redis not available, continuing without cache");
    redisAvailable = false;
  }
};

const safeRedis = {
  get: async (key) => {
    if (!redisAvailable || !redisClient) return null;

    try {
      const data = await redisClient.get(key);

      if (!data) return null;

      // Handle both string and object (Upstash quirk)
      return typeof data === "string" ? data : JSON.stringify(data);

    } catch (err) {
      console.log("Redis GET failed:", err.message);
      return null;
    }
  },

  set: async (key, value, options = {}) => {
    if (!redisAvailable || !redisClient) return;

    try {
      const stringValue = JSON.stringify(value);

      if (isUpstash) {
        // 🔥 OPTIMIZED: single command with TTL
        if (options.EX) {
          await redisClient.set(key, stringValue, { ex: options.EX });
        } else {
          await redisClient.set(key, stringValue);
        }
      } else {
        await redisClient.set(key, stringValue, options);
      }

    } catch (err) {
      console.log("Redis SET failed:", err.message);
    }
  },
};

export { redisClient, connectRedis, redisAvailable, safeRedis };