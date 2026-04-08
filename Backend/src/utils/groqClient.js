import Groq from "groq-sdk";

const groq = new Groq({
 apiKey: process.env.GROQ_API_KEY
});


// 🔥 STEP 2 — GENERATE KEYWORDS (STRICT + CLEAN)
const generateATSParameters = async (targetRole, jobDescription) => {

 const prompt = `
You are an ATS system.

Extract ONLY relevant technical skills from the job title and description.

Return ONLY valid JSON:

{
 "requiredSkills": [],
 "optionalSkills": []
}

Rules:
- Include ONLY technical/domain-specific skills
- Avoid soft skills unless explicitly required
- Keep skills concise (1–3 words)
- Do NOT include explanations or markdown

Job Title:
${targetRole}

Job Description:
${jobDescription}
`;

 const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [{ role: "user", content: prompt }],
  temperature: 0.2
 });

 const text = response.choices[0].message.content;

 // safer parsing
 const jsonMatch = text.match(/\{[\s\S]*\}/);

 if (!jsonMatch) {
  throw new Error("Failed to parse ATS parameters");
 }

 return JSON.parse(jsonMatch[0]);
};



// 🔥 STEP 5 — GENERATE SUGGESTIONS ONLY (NO SCORING HERE)
const generateSuggestions = async (
 resumeText,
 missingKeywords,
 targetRole
) => {

 const prompt = `
You are an ATS assistant.

The following keywords are missing from the resume:
${missingKeywords.join(", ")}

Resume:
${resumeText}

Instructions:
- Give specific suggestions to improve the resume
- Focus ONLY on missing keywords
- DO NOT suggest skills already present
- Be concise and actionable

Return ONLY JSON:

{
 "suggestions": []
}
`;

 const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [{ role: "user", content: prompt }],
  temperature: 0.2
 });

 const text = response.choices[0].message.content;

 const jsonMatch = text.match(/\{[\s\S]*\}/);

 if (!jsonMatch) {
  throw new Error("Failed to parse suggestions");
 }

 return JSON.parse(jsonMatch[0]);
};


export {
 generateATSParameters,
 generateSuggestions
};