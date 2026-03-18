import { extractResumeText } from "../utils/pdfExtractor.js";
import { generateATSParameters } from "../utils/groqClient.js";
import { evaluateResume } from "../utils/groqClient.js";

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

  // Extract text from PDF
  const resumeText = await extractResumeText(req.file.buffer);

  // Temporary response for Step 1
  return res.status(200).json({
   text: resumeText
  });

 } catch (error) {
  return res.status(500).json({
   message: "Resume analysis failed",
   error: error.message
  });
 }
};

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

const evaluateResumeController = async (req, res) => {
 try {

  if (!req.body) {
   return res.status(400).json({
    message: "Request body is missing"
   });
  }

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

export { analyzeResume, generateParameters, evaluateResumeController };