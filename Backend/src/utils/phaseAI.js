import {generateFromAI} from "./ai.js";
import { ApiError } from "./ApiError.js";

const generatePhaseDetailsFromAI = async ({ phase, roadmapTitle }) => {
  const phaseLabel = phase.label || phase.title || phase.name || "Phase";

  const prompt = `
You are an expert technical mentor.

Generate DETAILED PHASE EXPLANATION in STRICT JSON.

RULES:
- Output ONLY valid JSON
- No markdown
- No explanations
- Must be parseable by JSON.parse()
- summary must be >= 80 characters
- Use ONLY real publicly available URLs (no example.com)
- Prefer official docs (MDN, React.dev), trusted courses (freeCodeCamp), and quality YouTube channels
-If you are unsure about a link, omit it instead of guessing.


SCHEMA:
{
  "summary": string,
  "resources": [
    {
      "title": string,
      "url": string,
      "type": "article" | "video" | "docs"
    }
  ]
}

INPUT:
Roadmap Title: ${roadmapTitle}
Phase Label: ${phaseLabel}

Topics:
${phase.topics.map((t) => `- ${t.title}: ${t.subtopics.join(", ")}`).join("\n")}

Return ONLY the JSON object.
`;

  const aiRaw = await generateFromAI({ prompt, model: "gpt-4o-mini", temperature: 0.3, json: true });

  const cleaned = aiRaw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);

    return {
      summary: parsed.summary ?? "",
      resources: Array.isArray(parsed.resources) ? parsed.resources : [],
    };
  } catch (err) {
    console.error("❌ Phase AI JSON parse failed:", aiRaw);
    throw new ApiError(500, "AI returned invalid phase JSON");
  }
};

export { generatePhaseDetailsFromAI };