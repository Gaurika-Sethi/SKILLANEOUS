import Groq from "groq-sdk";

const groq = new Groq({
 apiKey: process.env.GROQ_API_KEY
});

const generateATSParameters = async (targetRole, jobDescription) => {

 const prompt = `
You are an ATS resume evaluation system.

From the given job title and job description, extract the important evaluation parameters used to judge resumes.

Return ONLY valid JSON.

Fields required:
requiredSkills
optionalSkills
importantSections
keywords
bulletPointGuidelines

Job Title:
${targetRole}

Job Description:
${jobDescription}
`;

 const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
   {
    role: "user",
    content: prompt
   }
  ],
  temperature: 0.2
 });

 const text = response.choices[0].message.content;

 const cleaned = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
  
  return JSON.parse(cleaned);
};

const evaluateResume = async (resumeText, parameters) => {

 const prompt = `
You are an ATS (Applicant Tracking System).

Evaluate the resume based on the given evaluation parameters.

Parameters:
${JSON.stringify(parameters)}

Resume:
${resumeText}

Return ONLY valid JSON with the following fields:

atsScore (0-100)
missingKeywords
suggestions
bulletPointImprovements

Do not include markdown or explanations.
`;

 const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
   {
    role: "user",
    content: prompt
   }
  ],
  temperature: 0.2
 });

 const text = response.choices[0].message.content;

 const jsonMatch = text.match(/\{[\s\S]*\}/);

 if (!jsonMatch) {
  throw new Error("AI response did not contain JSON");
 }

 return JSON.parse(jsonMatch[0]);
};

export { generateATSParameters, evaluateResume };