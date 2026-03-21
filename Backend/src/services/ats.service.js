import { extractResumeText } from "../utils/pdfExtractor.js";
import {
 generateATSParameters,
 evaluateResume
} from "../utils/groqClient.js";

import {
 getCacheKey,
 getCachedParameters,
 setCachedParameters
} from "../utils/atsCache.js";

import { fallbackAnalysis } from "../utils/fallbackAnalyzer.js";

const runATSAnalysis = async (
 fileBuffer,
 targetRole,
 jobDescription
) => {

 try {

  // Step 1 — Extract resume text
  const resumeText = await extractResumeText(fileBuffer);

  if (!resumeText || resumeText.trim().length === 0) {
   throw new Error("Failed to extract text from resume");
  }

  // Step 2 — Generate or fetch cached parameters
  const cacheKey = getCacheKey(targetRole, jobDescription);

  let parameters = getCachedParameters(cacheKey);

  if (!parameters) {
   try {
    parameters = await generateATSParameters(targetRole, jobDescription);
    setCachedParameters(cacheKey, parameters);
   } catch (err) {
    console.log("⚠️ Parameter generation failed, continuing without cache...");
   }
  }

  // Step 3 — Try AI evaluation if parameters exist
  if (parameters) {
   try {
    const evaluation = await evaluateResume(
     resumeText,
     parameters
    );

    if (evaluation) return evaluation;

   } catch (err) {
    console.log("⚠️ AI evaluation failed, using fallback...");
   }
  }

  // Step 4 — Fallback (guaranteed response)
  return fallbackAnalysis(resumeText, jobDescription);

 } catch (error) {
  throw new Error(`ATS Service Error: ${error.message}`);
 }
};

export { runATSAnalysis };