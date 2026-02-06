import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { RoadmapRequest } from "../models/roadmapRequest.model.js";
import { GeneratedRoadmap } from "../models/generatedRoadmap.model.js";
import { generateFromAI } from "../utils/ai.js";
import { buildRoadmapPrompt } from "../utils/roadmapPrompt.js";

const cleanAIJson = (raw) =>
  raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

const attachIdsToRoadmap = (structured) => {
  if (!structured?.phases || !Array.isArray(structured.phases)) return structured;

  const phases = structured.phases.map((phase, pi) => {
    const topics = (phase.topics || []).map((topic, ti) => {
      const subtopics = (topic.subtopics || []).map((s, si) => {
        if (typeof s === "string") {
          return {
            id: `subtopic-${pi + 1}-${ti + 1}-${si + 1}`,
            title: s,
          };
        }

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
      id: phase?.id || `phase-${pi + 1}`,
      topics,
    };
  });

  return { ...structured, phases };
};

const generateRoadmap = asyncHandler(async (req, res) => {
  console.log("🔥 ROADMAP ROUTE USING GROQ");
  console.log("🧠 generateRoadmap HIT");

  const { roadmapRequestId } = req.body || {};
  if (!roadmapRequestId) {
    throw new ApiError(400, "roadmapRequestId is required");
  }

  // 1️⃣ Fetch roadmap request
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
  const model = "llama-3.1-8b-instant";
  const aiRaw = await generateFromAI({
    prompt,
    model,
    temperature: 0.2,
  });

  console.log("AI RAW RESPONSE:", aiRaw);

  // 4️⃣ Parse JSON
  let structuredRoadmap;
  try {
    structuredRoadmap = JSON.parse(cleanAIJson(aiRaw));
  } catch (err) {
    console.error("❌ AI JSON PARSE FAILED:", err);
    throw new ApiError(500, "AI returned invalid JSON roadmap");
  }

  // 5️⃣ Validate schema
  if (!structuredRoadmap?.title || !Array.isArray(structuredRoadmap?.phases)) {
    throw new ApiError(500, "AI roadmap schema invalid");
  }

  // 6️⃣ Attach ids
  structuredRoadmap = attachIdsToRoadmap(structuredRoadmap);

  // 7️⃣ Save / upsert
  const generated = await GeneratedRoadmap.findOneAndUpdate(
    { roadmapRequestId },
    {
      userId: roadmapRequest.userId || null,
      roadmapRequestId,
      structured: structuredRoadmap,
      visibility: roadmapRequest.visibility,
      ai_metadata: {
        provider: "groq",
        model,
        prompt_version: "v1",
        temperature: 0.2,
      },

    },
    { upsert: true, new: true }
  );

  // ✅ RETURN RESPONSE
  return res
    .status(201)
    .json(new ApiResponse(201, generated, "Roadmap generated successfully"));
});

/* ✅ CURATED LIST */
const getCuratedRoadmap = asyncHandler(async (req, res) => {
  const roadmaps = await GeneratedRoadmap.find({
    roadmapType: "curated",
    isDefault: true,
    visibility: "public",
  })
    .select("card structured.title visibility createdAt")
    .sort({ createdAt: 1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      roadmaps.map((r) => ({
        _id: r._id,
        card: r.card,
        structuredTitle: r?.structured?.title ?? "",
      })),
      "Curated roadmaps fetched"
    )
  );
});

/* ✅ ROADMAP BY ID */
const getRoadmapById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid roadmap id");
  }

  const roadmap = await GeneratedRoadmap.findById(id).select(
    "structured visibility roadmapType isDefault"
  );

  if (!roadmap) {
    throw new ApiError(404, "Roadmap not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        roadmapId: roadmap._id,
        visibility: roadmap.visibility,
        structured: roadmap.structured,
        roadmapType: roadmap.roadmapType,
        isDefault: roadmap.isDefault,
      },
      "Roadmap fetched"
    )
  );
});

export { generateRoadmap, getCuratedRoadmap, getRoadmapById };