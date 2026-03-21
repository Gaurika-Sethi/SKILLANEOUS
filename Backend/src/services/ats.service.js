import { extractResumeText } from "../utils/pdfExtractor.js";
import {
 generateATSParameters,
 evaluateResume
} from "../utils/groqClient.js";

const runATSAnalysis = async (fileBuffer, targetRole, jobDescription) => {

 // Step 1 — Extract resume text
 const resumeText = await extractResumeText(fileBuffer);

 // Step 2 — Generate ATS parameters
 const parameters = await generateATSParameters(
  targetRole,
  jobDescription
 );

 // Step 3 — Evaluate resume
 const evaluation = await evaluateResume(
  resumeText,
  parameters
 );

 return evaluation;
};

export { runATSAnalysis };