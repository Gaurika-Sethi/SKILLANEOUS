import { extractResumeText } from "../utils/pdfExtractor.js";
import {
 generateATSParameters,
 generateSuggestions
} from "../utils/groqClient.js";

import { matchKeywords } from "../utils/keywordMatcher.js";

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

  // STEP 1 — Extract resume text
  const resumeText = await extractResumeText(fileBuffer);

  if (!resumeText || resumeText.trim().length === 0) {
   throw new Error("Failed to extract text from resume");
  }

  // STEP 2 — Generate or fetch cached parameters
  const cacheKey = getCacheKey(targetRole, jobDescription);

  let parameters = getCachedParameters(cacheKey);

  if (!parameters) {
   try {
    parameters = await generateATSParameters(targetRole, jobDescription);
    setCachedParameters(cacheKey, parameters);
   } catch (err) {
    console.log("⚠️ Parameter generation failed");
   }
  }

  // If parameters failed → fallback
  if (!parameters) {
   return fallbackAnalysis(resumeText, jobDescription);
  }

  // STEP 3 — Keyword matching (CORE LOGIC)
  const { matchedKeywords, missingKeywords } = matchKeywords(
   resumeText,
   parameters
  );

  // STEP 4 — Score calculation (DETERMINISTIC)
  const totalSkills =
   (parameters.requiredSkills?.length || 0) +
   (parameters.optionalSkills?.length || 0);

  const atsScore =
   totalSkills === 0
    ? 50
    : Math.round(
        ((totalSkills - missingKeywords.length) / totalSkills) * 100
      );

  // STEP 5 — AI suggestions (ONLY for improvements)
  let suggestions = [];

  try {
   const aiResponse = await generateSuggestions(
    resumeText,
    missingKeywords,
    targetRole
   );

   suggestions = aiResponse.suggestions || [];
  } catch (err) {
   console.log("⚠️ Suggestion generation failed");
   suggestions = ["Improve alignment with job description"];
  }

  // STEP 6 — Final response
  return {
   atsScore,
   missingKeywords,
   suggestions
  };

 } catch (error) {
  throw new Error(`ATS Service Error: ${error.message}`);
 }
};

export { runATSAnalysis };