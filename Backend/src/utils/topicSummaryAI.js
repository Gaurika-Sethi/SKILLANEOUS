import { ApiError } from "./ApiError.js";
import { generateFromAI } from "./ai.js";

const cleanAIJson = (raw) =>
  raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

export const generateTopicSummaryFromAI = async ({
  roadmapTitle,
  phaseLabel,
  topicTitle,
  subtopics,
}) => {
  const prompt = `
You are an expert technical mentor.

Return STRICT JSON only.
No markdown. No extra text.

SCHEMA:
{
  "summary": string
}

RULES:
- Focus ONLY on this topic
- Summary: 70 to 120 words
- Simple and beginner-friendly
- Mention what user will learn + outcome

INPUT:
Roadmap: ${roadmapTitle}
Phase: ${phaseLabel}
Topic: ${topicTitle}

Subtopics:
${subtopics.map((s) => `- ${s}`).join("\n")}

Return ONLY JSON.
`;

  const aiRaw = await generateFromAI({
    prompt,
    model: "gpt-4o-mini",
    temperature: 0.3,
    json: true,
  });

  let parsed;
  try {
    parsed = JSON.parse(cleanAIJson(aiRaw));
  } catch (e) {
    console.error("❌ Topic Summary JSON parse failed:", aiRaw);
    throw new ApiError(500, "AI returned invalid topic summary JSON");
  }

  const summary = parsed?.summary;
  if (!summary || typeof summary !== "string" || summary.trim().length < 30) {
    throw new ApiError(500, "AI returned incomplete topic summary");
  }

  return { summary: summary.trim() };
};