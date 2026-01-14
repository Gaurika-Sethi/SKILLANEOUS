import { generateRoadmapFromAI } from "./ai.js";

const generatePhaseDetailsFromAI = async ({
  roadmapMarkdown,
  phaseId,
}) => {
  const prompt = `
You are given a roadmap in markdown format.

Roadmap:
${roadmapMarkdown}

Task:
Extract details for ${phaseId}.

Return STRICT JSON in this format:
{
  "title": "...",
  "summary": "...",
  "resources": [
    {
      "type": "article|video|docs",
      "title": "...",
      "url": "..."
    }
  ]
}

Rules:
- Do not return markdown
- Do not include explanations
- Valid JSON only
`;

  const response = await generateRoadmapFromAI({
    prompt,
    model: "gpt-4o-mini",
    temperature: 0.3,
  });

  return JSON.parse(response);
};

export { generatePhaseDetailsFromAI };