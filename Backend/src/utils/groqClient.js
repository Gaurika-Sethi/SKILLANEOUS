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
You are an ATS (Applicant Tracking System).

Your job is to evaluate a resume realistically and fairly.

-----------------------------------

INPUT:

Required Skills:
${requiredSkills.join(", ")}

Optional Skills:
${optionalSkills.join(", ")}

Resume:
${resumeText.slice(0, 2000)}

-----------------------------------

EVALUATION BEHAVIOR:

- Be realistic, not overly harsh
- Evaluate overall profile, not just keyword presence
- Consider projects, experience, and practical exposure
- Allow strong profiles to compensate for minor missing skills
- Do NOT give overly perfect evaluations

-----------------------------------

SKILL MATCHING RULES:

- Only count a skill if there is clear evidence
- Accept closely related technologies:
  - Express.js → Node.js
  - REST APIs → Backend Development
- Do NOT assume skills without evidence

-----------------------------------

MISSING SKILLS RULE:

- Only include important missing skills
- Do NOT list trivial or loosely related skills
- Maximum 3-5 missing skills

-----------------------------------

SCORING LOGIC:

- Required Skills: 50%
- Optional Skills: 20%
- Experience/Projects: 30%

SCORING GUIDELINES:

- Missing 1-2 required skills → small penalty
- Missing many required skills → larger penalty
- Strong projects/experience → increase score
- Weak or irrelevant experience → reduce score

Score Ranges:
- 75-85 → strong match
- 60-74 → moderate match
- 40-59 → weak match
- below 40 → poor match

-----------------------------------

OUTPUT REQUIREMENTS:

- ALWAYS include at least 1 weakness
- ALWAYS include at least 1 suggestion
- Suggestions must be based ONLY on missing skills or weaknesses

-----------------------------------

RETURN STRICT JSON ONLY:

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