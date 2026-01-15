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

  console.log("HEADERS:", req.headers["content-type"]);
  console.log("BODY:", req.body);

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

  // ✅ 3) locate phase
  const phase = structured.phases.find((p) => p.id === phaseId);
  if (!phase) throw new ApiError(404, `Phase '${phaseId}' not found`);

  const phaseLabel = phase.label || phase.title || phase.name || phaseId;

  // ✅ 4) locate topic using topicId
  const topic = (phase.topics || []).find((t) => t.id === topicId);
  if (!topic) throw new ApiError(404, `Topic '${topicId}' not found in phase '${phaseId}'`);

  const topicTitle = topic.title || "Topic";

  // ✅ 5) locate subtopic using subtopicId
  const subtopicsArray = Array.isArray(topic.subtopics) ? topic.subtopics : [];

  const subtopicObj = subtopicsArray.find((s) => {
    if (typeof s === "string") return false; // roadmap should now be object-based, but safe check
    return s.id === subtopicId;
  });

  if (!subtopicObj) {
    throw new ApiError(
      404,
      `Subtopic '${subtopicId}' not found under topic '${topicTitle}'`
    );
  }

  const subtopicTitle = subtopicObj.title;

  // helpful for AI prompt
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

  // ✅ 7) upsert (safe)
  const saved = await SubtopicDetail.findOneAndUpdate(
    { roadmapRequestId, phaseId, topicId, subtopicId },
    {
      roadmapRequestId,
      phaseId,
      topicId,
      subtopicId,

      // store titles too for display/search/debug
      topicTitle,
      subtopicTitle,

      ...ai,

      ai_metadata: {
        provider: "openai",
        model: "gpt-4o-mini",
        temperature: 0.3,
        prompt_version: "v2-json-subtopic",
      },
    },
    { upsert: true, new: true }
  );

  return res.status(200).json({ success: true, data: saved });
});

export { getSubtopicDetails };
