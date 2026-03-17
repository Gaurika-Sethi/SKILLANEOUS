import { extractResumeText } from "../utils/pdfExtractor.js";

export const analyzeResume = async (req, res) => {
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

  const resumeText = await extractResumeText(req.file.buffer);

  res.status(200).json({
   text: resumeText
  });

 } catch (error) {
  res.status(500).json({
   message: "Resume parsing failed",
   error: error.message
  });
 }
};