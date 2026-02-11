import { ApiError } from "./ApiError.js";
import { generateFromAI } from "./ai.js";

const cleanJson = (raw) =>
  raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

const badText = (v) =>
  !v ||
  typeof v !== "string" ||
  v.trim().length < 30 ||
  ["undefined", "null", "n/a"].includes(v.trim().toLowerCase());

const generateSubtopicDetailsFromAI = async ({
  roadmapTitle,
  phaseLabel,
  topicTitle,
  subtopicTitle,
  allSubtopicsInTopic = [],
}) => {
  const prompt = `
You are an expert technical mentor.

Return STRICT JSON only (no markdown, no extra text).

RULES:
- Output ONLY valid JSON
- No explanations
- Must be parseable by JSON.parse()
- Use REAL public resources (NO example.com, NO placeholders)
- Prefer official docs (MDN, React.dev, web.dev, developer.chrome.com)
- If unsure about a URL, omit that resource instead of guessing.

SCHEMA:
{
  "title": string,
  "summary": string,
  "resources": [
    { "title": string, "url": string, "type": "article" | "video" | "docs" }
  ]
}

CONTEXT:
Roadmap: ${roadmapTitle}
Phase: ${phaseLabel}
Topic: ${topicTitle}
Subtopic: ${subtopicTitle}

Other subtopics in same topic:
${allSubtopicsInTopic.map((s) => `- ${s}`).join("\n")}

Return ONLY the JSON object.
`;

  const aiRaw = await generateFromAI({
    prompt,
    model: "llama-3.1-8b-instant",
    temperature: 0.2,
    json: true, // ✅ if you implemented json mode in generateFromAI
  });
  console.log("🧠 AI RAW SUBTOPIC OUTPUT:\n", aiRaw);

  let parsed;
  try {
    parsed = JSON.parse(cleanJson(aiRaw));
  } catch (e) {
    console.error("❌ Subtopic AI invalid JSON:", aiRaw);
    throw new ApiError(500, "AI returned invalid subtopic JSON");
  }

  console.log("✅ PARSED SUBTOPIC OUTPUT:\n", parsed);

  const isValidString = (v, minLen = 10) =>
  typeof v === "string" &&
  v.trim().length >= minLen &&
  !["undefined", "null", "n/a"].includes(v.trim().toLowerCase());

if (
  !isValidString(parsed.title, 3) ||
  !isValidString(parsed.summary, 20)
) {
  console.error("❌ INVALID SUBTOPIC FIELDS:", {
    title: parsed.title,
    summary: parsed.summary,
  });
  throw new ApiError(500, "AI returned incomplete subtopic details");
}

  return {
    title: parsed.title,
    summary: parsed.summary,
    resources: Array.isArray(parsed.resources) ? parsed.resources : [],
  };
};

export { generateSubtopicDetailsFromAI };