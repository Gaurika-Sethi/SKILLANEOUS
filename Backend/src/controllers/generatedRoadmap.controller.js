import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { RoadmapRequest } from "../models/roadmapRequest.model.js";
import { GeneratedRoadmap } from "../models/generatedRoadmap.model.js";
import { generateFromAI } from "../utils/ai.js";
import { buildRoadmapPrompt } from "../utils/roadmapPrompt.js";

/**
 * ✅ Clean AI JSON output (remove markdown fences if any)
 */
const cleanAIJson = (raw) =>
  raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

/**
 * ✅ Adds stable IDs to topics and subtopics
 * Converts subtopics from string[] → {id,title}[]
 */
const attachIdsToRoadmap = (structured) => {
  if (!structured?.phases || !Array.isArray(structured.phases)) return structured;

  const phases = structured.phases.map((phase, pi) => {
    const topics = (phase.topics || []).map((topic, ti) => {
      const subtopics = (topic.subtopics || []).map((s, si) => {
        // Convert string -> object
        if (typeof s === "string") {
          return {
            id: `subtopic-${pi + 1}-${ti + 1}-${si + 1}`,
            title: s,
          };
        }

        // Already object
        return {
          id: s?.id || `subtopic-${pi + 1}-${ti + 1}-${si + 1}`,
          title: s?.title || "",
        };
      });

      return {
        ...topic,
        id: topic?.id || `topic-${pi + 1}-${ti + 1}`,
        subtopics,
      };
    });

    return {
      ...phase,
      topics,
    };
  });

  return { ...structured, phases };
};

const generateRoadmap = asyncHandler(async (req, res) => {
  console.log("🧠 generateRoadmap HIT");

  const { roadmapRequestId } = req.body || {};
  if (!roadmapRequestId) {
    throw new ApiError(400, "roadmapRequestId is required");
  }

  // 1️⃣ Fetch user roadmap request
  const roadmapRequest = await RoadmapRequest.findById(roadmapRequestId).lean();
  if (!roadmapRequest) {
    throw new ApiError(404, "Roadmap request not found");
  }

  // 2️⃣ Build prompt
  const prompt = buildRoadmapPrompt({
    targetField: roadmapRequest.targetField,
    primaryPurpose: roadmapRequest.primaryPurpose,
    skills: roadmapRequest.skills || [],
    specificFocus: roadmapRequest.specificFocus,
  });

  // 3️⃣ Call AI
  const aiRaw = await generateFromAI({
    prompt,
    model: "gpt-4o-mini",
    temperature: 0.3,
    json: true, // ✅ if your generateFromAI supports json mode
  });

  console.log("AI RAW RESPONSE:", aiRaw);

  // 4️⃣ Parse JSON safely
  let structuredRoadmap;
  try {
    structuredRoadmap = JSON.parse(cleanAIJson(aiRaw));
  } catch (err) {
    console.error("❌ AI JSON PARSE FAILED:", err);
    throw new ApiError(500, "AI returned invalid JSON roadmap");
  }

  // 5️⃣ Basic schema validation
  if (!structuredRoadmap?.title || !Array.isArray(structuredRoadmap?.phases)) {
    throw new ApiError(500, "AI roadmap schema invalid");
  }

  // ✅ 6️⃣ Attach topic/subtopic IDs (THIS IS THE MAIN FIX)
  structuredRoadmap = attachIdsToRoadmap(structuredRoadmap);

  // ✅ Optional: Avoid duplicates (if roadmap already generated)
  // You can use upsert instead of always creating new
  const generated = await GeneratedRoadmap.findOneAndUpdate(
    { roadmapRequestId },
    {
      userId: roadmapRequest.userId || null,
      roadmapRequestId,
      structured: structuredRoadmap,
      visibility: roadmapRequest.visibility,
      ai_metadata: {
        provider: "openai",
        model: "gpt-4o-mini",
        temperature: 0.3,
        prompt_version: "v2-json",
      },
    },
    { upsert: true, new: true }
  );

  // 7️⃣ Respond
  return res
    .status(201)
    .json(new ApiResponse(201, generated.structured, "Roadmap generated successfully"));
});

export { generateRoadmap };