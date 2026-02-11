import mongoose from "mongoose";
import { GeneratedRoadmap } from "../models/generatedRoadmap.model.js";
import { SubtopicDetail } from "../models/subtopicDetail.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateSubtopicDetailsFromAI } from "../utils/subtopicAI.js";

const getSubtopicDetails = asyncHandler(async (req, res) => {
  const { roadmapRequestId, phaseId, topicId, subtopicId } = req.body || {};

  if (!roadmapRequestId || !phaseId || !topicId || !subtopicId) {
    throw new ApiError(
      400,
      "roadmapRequestId, phaseId, topicId, subtopicId are required"
    );
  }

  // ✅ 1) cache
  const cached = await SubtopicDetail.findOne({
    roadmapRequestId,
    phaseId,
    topicId,
    subtopicId,
  });

  if (cached) {
    return res.status(200).json({ success: true, data: cached });
  }

  // ✅ 2) roadmap fetch (supports BOTH generated and curated)
  let roadmap = await GeneratedRoadmap.findOne({ roadmapRequestId }).lean();

  // If not found by roadmapRequestId, try by _id (curated case)
  if (!roadmap && mongoose.Types.ObjectId.isValid(roadmapRequestId)) {
    roadmap = await GeneratedRoadmap.findById(roadmapRequestId).lean();
  }

  if (!roadmap?.structured) {
    throw new ApiError(404, "Roadmap not found");
  }

  // normalize
  let structured = roadmap.structured;
  if (typeof structured === "string") {
    try {
      structured = JSON.parse(structured);
    } catch {
      throw new ApiError(500, "Stored roadmap JSON is corrupted");
    }
  }

  if (!Array.isArray(structured.phases)) {
    throw new ApiError(500, "Invalid roadmap structure");
  }

  // ✅ 3) locate phase
  const phase = structured.phases.find((p) => p.id === phaseId);
  if (!phase) throw new ApiError(404, `Phase '${phaseId}' not found`);

  const phaseLabel = phase.label || phase.title || phase.name || phaseId;

  // ✅ 4) locate topic
  const topic = (phase.topics || []).find((t) => t.id === topicId);
  if (!topic)
    throw new ApiError(
      404,
      `Topic '${topicId}' not found in phase '${phaseId}'`
    );

  const topicTitle = topic.title || "Topic";

  // ✅ 5) locate subtopic
  const subtopicsArray = Array.isArray(topic.subtopics) ? topic.subtopics : [];

  const subtopicObj = subtopicsArray.find((s) => {
    if (typeof s === "string") return false;
    return s.id === subtopicId;
  });

  if (!subtopicObj) {
    throw new ApiError(
      404,
      `Subtopic '${subtopicId}' not found under topic '${topicTitle}'`
    );
  }

  const subtopicTitle = subtopicObj.title;

  const allSubtopicsInTopic = subtopicsArray.map((s) =>
    typeof s === "string" ? s : s.title
  );

  // ✅ 6) AI generate
  const ai = await generateSubtopicDetailsFromAI({
    roadmapTitle: structured.title || "Learning Roadmap",
    phaseLabel,
    topicTitle,
    subtopicTitle,
    allSubtopicsInTopic,
  });

  // ✅ 7) upsert
  const saved = await SubtopicDetail.findOneAndUpdate(
    { roadmapRequestId, phaseId, topicId, subtopicId },
    {
      roadmapRequestId,
      phaseId,
      topicId,
      subtopicId,
      topicTitle,
      subtopicTitle,
      ...ai,
      ai_metadata: {
        provider: "groq",
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        prompt_version: "v2-json-subtopic",
      },
    },
    { upsert: true, new: true }
  );

  return res.status(200).json({ success: true, data: saved });
});

export { getSubtopicDetails };