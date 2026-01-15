import { GeneratedRoadmap } from "../models/generatedRoadmap.model.js";
import { TopicSummary } from "../models/topicSummary.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateTopicSummaryFromAI } from "../utils/topicSummaryAI.js";

const getTopicSummary = asyncHandler(async (req, res) => {
  const { roadmapRequestId, phaseId, topicId } = req.body || {};

  if (!roadmapRequestId || !phaseId || !topicId) {
    throw new ApiError(400, "roadmapRequestId, phaseId, topicId are required");
  }

  // ✅ 1) Cache
  const cached = await TopicSummary.findOne({ roadmapRequestId, phaseId, topicId });
  if (cached) {
    return res.status(200).json({ success: true, data: cached });
  }

  // ✅ 2) Fetch roadmap
  const roadmap = await GeneratedRoadmap.findOne({ roadmapRequestId }).lean();
  if (!roadmap?.structured) {
    throw new ApiError(404, "Generated roadmap not found");
  }

  let structured = roadmap.structured;
  if (typeof structured === "string") structured = JSON.parse(structured);

  const phase = structured.phases?.find((p) => p.id === phaseId);
  if (!phase) throw new ApiError(404, `Phase '${phaseId}' not found`);

  const phaseLabel = phase.label || phase.title || phaseId;

  const topic = (phase.topics || []).find((t) => t.id === topicId);
  if (!topic) throw new ApiError(404, `Topic '${topicId}' not found`);

  const topicTitle = topic.title || "Topic";
  const subtopics = (topic.subtopics || []).map((s) => (typeof s === "string" ? s : s.title));

  // ✅ 3) Generate summary
  const ai = await generateTopicSummaryFromAI({
    roadmapTitle: structured.title || "Learning Roadmap",
    phaseLabel,
    topicTitle,
    subtopics,
  });

  // ✅ 4) Save (upsert)
  const saved = await TopicSummary.findOneAndUpdate(
    { roadmapRequestId, phaseId, topicId },
    {
      roadmapRequestId,
      phaseId,
      topicId,
      topicTitle,
      summary: ai.summary,
      ai_metadata: {
        provider: "openai",
        model: "gpt-4o-mini",
        temperature: 0.3,
        prompt_version: "v1-json-topic-summary",
      },
    },
    { upsert: true, new: true }
  );

  return res.status(200).json({ success: true, data: saved });
});

export { getTopicSummary };