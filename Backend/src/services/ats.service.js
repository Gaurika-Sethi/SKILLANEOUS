import { extractResumeText } from "../utils/pdfExtractor.js";
import {
 generateATSParameters,
 evaluateResume
} from "../utils/groqClient.js";

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

  // Step 2 — Generate evaluation parameters
  const parameters = await generateATSParameters(
   targetRole,
   jobDescription
  );

  if (!parameters) {
   throw new Error("Failed to generate ATS parameters");
  }

  // Step 3 — Evaluate resume
  const evaluation = await evaluateResume(
   resumeText,
   parameters
  );

  if (!evaluation) {
   throw new Error("Failed to evaluate resume");
  }

  // Step 4 — Return final ATS result
  return evaluation;

 } catch (error) {
  throw new Error(`ATS Service Error: ${error.message}`);
 }
};

export { runATSAnalysis };