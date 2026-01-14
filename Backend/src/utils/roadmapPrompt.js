

const buildRoadmapPrompt = ({
  targetField,
  primaryPurpose,
  skills,
  specificFocus,
}) => {
  return `
You are an expert curriculum designer.

Your task is to generate a LEARNING ROADMAP in STRICT JSON FORMAT.

IMPORTANT RULES:
- Output ONLY valid JSON
- No markdown
- No explanations
- No comments
- No extra text
- Must be parseable by JSON.parse()
- Follow the schema EXACTLY

SCHEMA:
{
  "title": string,
  "phases": [
    {
      "id": string,        // format: "phase-1", "phase-2", etc.
      "label": string,     // e.g. "Phase 1: Fundamentals"
      "topics": [
        {
          "title": string,
          "subtopics": string[]
        }
      ]
    }
  ]
}

CONSTRAINTS:
- Phases must be progressive (beginner → advanced)
- Each phase must have 2–4 topics
- Each topic must have 4–7 subtopics
- IDs must be unique and ordered

INPUT DATA:
Target Field: ${targetField}
Primary Purpose: ${primaryPurpose}
Specific Focus: ${specificFocus || "None"}

Current Skills:
${skills
  .map((s) => `- ${s.name} (${s.level}, ${s.years} years)`)
  .join("\n")}

Return ONLY the JSON object.
`;
};

export { buildRoadmapPrompt };