import { redisClient, redisAvailable } from "../config/redisClient.js";
import crypto from "crypto";

// 🔹 Parameter Cache
const getCacheKey = (targetRole, jobDescription) => {
  return `params:${targetRole.toLowerCase()}::${jobDescription.toLowerCase()}`;
};

const getCachedParameters = async (key) => {
  if (!redisAvailable) return null;

  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.log("Cache read failed");
    return null;
  }
};

const setCachedParameters = async (key, value) => {
  if (!redisAvailable) return;

  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: 60 * 60
    });
  } catch (err) {
    console.log("Cache write failed");
  }
};

// 🔹 Evaluation Cache
const getEvaluationCacheKey = (resumeText, targetRole, jobDescription) => {
  return `eval:${targetRole.toLowerCase()}::${jobDescription.toLowerCase()}::${
    crypto.createHash("sha256").update(resumeText).digest("hex")
  }`;
};

const getCachedEvaluation = async (key) => {
  if (!redisAvailable) return null;

  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.log("Cache read failed");
    return null;
  }
};

const setCachedEvaluation = async (key, value) => {
  if (!redisAvailable) return;

  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: 60 * 60
    });
  } catch (err) {
    console.log("Cache write failed");
  }
};


export {
  getCacheKey,
  getCachedParameters,
  setCachedParameters,
  getEvaluationCacheKey,
  getCachedEvaluation,
  setCachedEvaluation
};