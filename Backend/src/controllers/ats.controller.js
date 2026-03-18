import { extractResumeText } from "../utils/pdfExtractor.js";

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

export { analyzeResume };