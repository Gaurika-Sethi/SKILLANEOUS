import { extractResumeText } from "../utils/pdfExtractor.js";
import {
 generateATSParameters,
 evaluateResumeATS
} from "../utils/groqClient.js";

import {
  getCacheKey,
  getCachedParameters,
  setCachedParameters,
  getEvaluationCacheKey,
  getCachedEvaluation,
  setCachedEvaluation
} from "../utils/atsCache.js";

import { fallbackAnalysis } from "../utils/fallbackAnalyzer.js";

const runATSAnalysis = async (
 fileBuffer,
 targetRole,
 jobDescription
) => {

 try {

  // STEP 1 — Extract resume text
  const resumeText = await extractResumeText(fileBuffer);

  if (!resumeText || resumeText.trim().length === 0) {
   throw new Error("Failed to extract text from resume");
  }

  // STEP 2 — Generate or fetch cached parameters
  const cacheKey = getCacheKey(targetRole, jobDescription);

  let parameters = await getCachedParameters(cacheKey);

  if (parameters) {
    console.log("⚡ Parameter cache hit");
  }

  if (!parameters) {
   try {
    parameters = await generateATSParameters(targetRole, jobDescription);

    if (parameters) {
      await setCachedParameters(cacheKey, parameters);
    }

   } catch (err) {
    console.log("⚠️ Parameter generation failed");
   }
  }

  // If parameters failed → fallback
  if (!parameters) {
   return fallbackAnalysis(resumeText, jobDescription);
  }

  // 🔥 STEP 3 — Evaluation Cache Check
  const evalCacheKey = getEvaluationCacheKey(
    resumeText,
    targetRole,
    jobDescription
  );

  const cachedEvaluation = await getCachedEvaluation(evalCacheKey);

  if (cachedEvaluation) {
    console.log("⚡ Evaluation cache hit");
    return cachedEvaluation;
  }

  // STEP 4 — AI Evaluation
  let atsResult;

  try {
    atsResult = await evaluateResumeATS(resumeText, parameters);
  } catch (err) {
    console.log("⚠️ AI evaluation failed, using fallback");
    return fallbackAnalysis(resumeText, jobDescription);
  }

  // STEP 5 — Safe Final Response

  let finalScore = Number(atsResult.score);

  if (isNaN(finalScore)) finalScore = 50;
  finalScore = Math.max(0, Math.min(100, finalScore));

  const missingKeywords = Array.isArray(atsResult.missing_required_skills)
    ? atsResult.missing_required_skills
    : [];

  const suggestions = Array.isArray(atsResult.suggestions)
    ? atsResult.suggestions
    : ["Improve alignment with job description"];

  const strengths = Array.isArray(atsResult.strengths)
    ? atsResult.strengths
    : [];

  const weaknesses = Array.isArray(atsResult.weaknesses)
    ? atsResult.weaknesses
    : [];

  const finalResponse = {
    atsScore: finalScore,
    missingKeywords,
    suggestions,
    strengths,
    weaknesses
  };

  // 🔥 STEP 6 — Cache result (only if valid)
  try {
    await setCachedEvaluation(evalCacheKey, finalResponse);
  } catch (err) {
    console.log("Cache write skipped");
  }

  return finalResponse;

 } catch (error) {
  throw new Error(`ATS Service Error: ${error.message}`);
 }
};

export { runATSAnalysis };