import { generateATSParameters, evaluateResume } from "../utils/groqClient.js";
import { runATSAnalysis } from "../services/ats.service.js";

// FINAL ATS PIPELINE CONTROLLER
const analyzeResume = async (req, res) => {
 try {
  const { targetRole, jobDescription } = req.body;

  if (!targetRole || !jobDescription) {
   return res.status(400).json({
    message: "targetRole and jobDescription are required"
   });
  }

  if (!req.file) {
   return res.status(400).json({
    message: "Resume PDF is required"
   });
  }

  // 🔥 Call service (clean architecture)
  const result = await runATSAnalysis(
   req.file.buffer,
   targetRole,
   jobDescription
  );

  // Return only required fields (your Phase-0 spec)
  return res.status(200).json({
    success: true,
    data: {
        atsScore: result.atsScore,
        missingKeywords: result.missingKeywords,
        suggestions: result.suggestions
    }
});

 } catch (error) {
  return res.status(500).json({
    success: false,
    message: "ATS analysis failed",
    error: error.message
  });
 }
};



// STEP 2 TESTING CONTROLLER (keep for debugging)
const generateParameters = async (req, res) => {
 try {
  const { targetRole, jobDescription } = req.body;

  if (!targetRole || !jobDescription) {
   return res.status(400).json({
    message: "targetRole and jobDescription are required"
   });
  }

  const parameters = await generateATSParameters(
   targetRole,
   jobDescription
  );

  return res.status(200).json(parameters);

 } catch (error) {
  return res.status(500).json({
   message: "Failed to generate ATS parameters",
   error: error.message
  });
 }
};



// STEP 3 TESTING CONTROLLER (keep for debugging)
const evaluateResumeController = async (req, res) => {
 try {

  const { resumeText, parameters } = req.body;

  if (!resumeText || !parameters) {
   return res.status(400).json({
    message: "resumeText and parameters are required"
   });
  }

  const evaluation = await evaluateResume(resumeText, parameters);

  return res.status(200).json(evaluation);

 } catch (error) {
  return res.status(500).json({
   message: "Resume evaluation failed",
   error: error.message
  });
 }
};

export {
 analyzeResume,
 generateParameters,
 evaluateResumeController
};