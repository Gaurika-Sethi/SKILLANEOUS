import { generateATSParameters } from "../utils/groqClient.js";
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

  const result = await runATSAnalysis(
   req.file.buffer,
   targetRole,
   jobDescription
  );

  return res.status(200).json({
    success: true,
    data: {
      atsScore: result.atsScore,
      missingKeywords: result.missingKeywords,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
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


// STEP 2 TESTING CONTROLLER
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

export {
 analyzeResume,
 generateParameters
};