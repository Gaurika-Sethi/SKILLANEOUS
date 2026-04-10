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

const evaluateResumeATS = async (resumeText, parameters) => {
  const { requiredSkills = [], optionalSkills = [] } = parameters;

  const prompt = `
You are a strict ATS (Applicant Tracking System).

Your task is to evaluate a resume against job requirements.

INPUT:

Required Skills:
${requiredSkills.join(", ")}

Optional Skills:
${optionalSkills.join(", ")}

Resume:
${resumeText.slice(0, 2000)}

---

EVALUATION RULES:

1. Be STRICT — do not assume skills without evidence
2. Consider closely related technologies:
   - Express.js → Node.js
   - REST API → Backend Development
3. Required skills are more important than optional skills
4. Penalize missing required skills heavily
5. Only count a skill if clearly demonstrated

---

SCORING SYSTEM:

- Required Skills: 60%
- Optional Skills: 20%
- Experience/Projects relevance: 20%

Score must be an integer between 0 and 100

---

OUTPUT FORMAT (STRICT JSON ONLY):

{
  "score": number,
  "matched_required_skills": [],
  "missing_required_skills": [],
  "matched_optional_skills": [],
  "missing_optional_skills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}

---

STRICT RULES:
- Suggestions MUST be based only on missing skills or weak areas
- DO NOT add skills not present in required/optional lists
- DO NOT include explanations outside JSON
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0
  });

  const text = response.choices[0].message.content;

  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Failed to parse ATS evaluation");
  }

  return JSON.parse(jsonMatch[0]);
};

export {
 generateATSParameters,
 generateSuggestions,
 evaluateResumeATS
};