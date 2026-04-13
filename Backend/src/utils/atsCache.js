import { redisClient } from "../config/redisClient.js";
import crypto from "crypto";

// 🔹 Parameter Cache
const getCacheKey = (targetRole, jobDescription) => {
  return `params:${targetRole.toLowerCase()}::${jobDescription.toLowerCase()}`;
};

const getCachedParameters = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

const setCachedParameters = async (key, value) => {
  await redisClient.set(key, JSON.stringify(value), {
    EX: 60 * 60 // 1 hour expiry
  });
};

// 🔹 Evaluation Cache
const getEvaluationCacheKey = (resumeText, targetRole, jobDescription) => {
  return `eval:${targetRole.toLowerCase()}::${jobDescription.toLowerCase()}::${
    crypto.createHash("sha256").update(resumeText).digest("hex")
  }`;
};

const getCachedEvaluation = async (key) => {
  const data = await redisClient.get(key);
  return data ? JSON.parse(data) : null;
};

const setCachedEvaluation = async (key, value) => {
  await redisClient.set(key, JSON.stringify(value), {
    EX: 60 * 60 // 1 hour expiry
  });
};

export {
  getCacheKey,
  getCachedParameters,
  setCachedParameters,
  getEvaluationCacheKey,
  getCachedEvaluation,
  setCachedEvaluation
};