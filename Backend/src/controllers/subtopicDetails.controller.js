import { GeneratedRoadmap } from "../models/generatedRoadmap.model.js";
import { SubtopicDetail } from "../models/subtopicDetail.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateSubtopicDetailsFromAI } from "../utils/subtopicAI.js";

const getSubtopicDetails = asyncHandler(async (req, res) => {
    
  const { roadmapRequestId, phaseId, topicTitle, subtopicTitle } = req.body || {};

  if (!roadmapRequestId || !phaseId || !topicTitle || !subtopicTitle) {
    throw new ApiError(400, "roadmapRequestId, phaseId, topicTitle, subtopicTitle are required");
  }
  console.log("HEADERS:", req.headers["content-type"]);
  console.log("BODY:", req.body);


  // ✅ 1) cache
  const cached = await SubtopicDetail.findOne({ roadmapRequestId, phaseId, topicTitle, subtopicTitle });
  if (cached) {
    return res.status(200).json({ success: true, data: cached });
  }

  // ✅ 2) roadmap fetch
  const roadmap = await GeneratedRoadmap.findOne({ roadmapRequestId }).lean();
  if (!roadmap?.structured) throw new ApiError(404, "Generated roadmap not found");

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

  // ✅ 3) locate phase + topic
  const phase = structured.phases.find((p) => p.id === phaseId);
  if (!phase) throw new ApiError(404, `Phase ${phaseId} not found`);

  const phaseLabel = phase.label || phase.title || phase.name || phaseId;

  const topic = (phase.topics || []).find((t) => t.title === topicTitle);
  if (!topic) throw new ApiError(404, `Topic '${topicTitle}' not found`);

  // ensure subtopic exists
  const allSubtopicsInTopic = Array.isArray(topic.subtopics) ? topic.subtopics : [];
  const exists = allSubtopicsInTopic.includes(subtopicTitle);
  if (!exists) throw new ApiError(404, `Subtopic '${subtopicTitle}' not found under '${topicTitle}'`);

  // ✅ 4) AI generate
  const ai = await generateSubtopicDetailsFromAI({
    roadmapTitle: structured.title || "Learning Roadmap",
    phaseLabel,
    topicTitle,
    subtopicTitle,
    allSubtopicsInTopic,
  });

  // ✅ 5) upsert (safe)
  const saved = await SubtopicDetail.findOneAndUpdate(
    { roadmapRequestId, phaseId, topicTitle, subtopicTitle },
    {
      roadmapRequestId,
      phaseId,
      topicTitle,
      subtopicTitle,
      ...ai,
      ai_metadata: {
        provider: "openai",
        model: "gpt-4o-mini",
        temperature: 0.3,
        prompt_version: "v1-json-subtopic",
      },
    },
    { upsert: true, new: true }
  );

  return res.status(200).json({ success: true, data: saved });
});

export { getSubtopicDetails };