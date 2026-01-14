import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { RoadmapRequest } from "../models/roadmapRequest.model.js";
import { GeneratedRoadmap } from "../models/generatedRoadmap.model.js";
import { generateFromAI } from "../utils/ai.js";
import { buildRoadmapPrompt } from "../utils/roadmapPrompt.js";

const generateRoadmap = asyncHandler(async (req, res) => {
  console.log("🧠 generateRoadmap HIT");

  const { roadmapRequestId } = req.body;
  if (!roadmapRequestId) {
    throw new ApiError(400, "roadmapRequestId is required");
  }

  /* 1️⃣ Fetch user roadmap request */
  const roadmapRequest = await RoadmapRequest.findById(roadmapRequestId).lean();
  if (!roadmapRequest) {
    throw new ApiError(404, "Roadmap request not found");
  }

  /* 2️⃣ Build JSON-only prompt */
  const prompt = buildRoadmapPrompt({
    targetField: roadmapRequest.targetField,
    primaryPurpose: roadmapRequest.primaryPurpose,
    skills: roadmapRequest.skills || [],
    specificFocus: roadmapRequest.specificFocus,
  });

  /* 3️⃣ Call AI */
  const aiRaw = await generateFromAI({
    prompt,
    model: "gpt-4o-mini",
    temperature: 0.3,
  });

  console.log("AI RAW RESPONSE:", aiRaw);

  /* 4️⃣ Parse JSON safely */
  let structuredRoadmap;
  try {
    structuredRoadmap = JSON.parse(aiRaw);
  } catch (err) {
    console.error("❌ AI JSON PARSE FAILED");
    throw new ApiError(500, "AI returned invalid JSON roadmap");
  }

  /* 5️⃣ Basic schema validation (minimal but critical) */
  if (
    !structuredRoadmap?.title ||
    !Array.isArray(structuredRoadmap?.phases)
  ) {
    throw new ApiError(500, "AI roadmap schema invalid");
  }

  /* 6️⃣ Save generated roadmap */
  const generated = await GeneratedRoadmap.create({
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
  });

  /* 7️⃣ Respond */
  return res.status(201).json(
    new ApiResponse(
      201,
      generated.structured,
      "Roadmap generated successfully"
    )
  );
});

export { generateRoadmap };