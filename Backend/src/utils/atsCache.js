import { safeRedis } from "../config/redisClient.js";
import crypto from "crypto";

// 🔹 Parameter Cache
const getCacheKey = (targetRole, jobDescription) => {
  return `params:${targetRole.toLowerCase()}::${jobDescription.toLowerCase()}`;
};

const getCachedParameters = async (key) => {
  try {
    const data = await safeRedis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.log("Cache read failed");
    return null;
  }
};

const setCachedParameters = async (key, value) => {
  try {
    await safeRedis.set(key, value, {
  EX: 60 * 60});
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
  try {
    const data = await safeRedis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.log("Cache read failed:", err.message);
    return null;
  }
};

const setCachedEvaluation = async (key, value) => {
  try {
    await safeRedis.set(key, value, {
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