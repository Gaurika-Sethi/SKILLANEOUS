import { GeneratedRoadmap } from "../models/generatedRoadmap.model.js";
import { PhaseDetail } from "../models/phaseDetail.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generatePhaseDetailsFromAI } from "../utils/phaseAI.js";

const isBadText = (val) =>
  !val ||
  typeof val !== "string" ||
  val.trim().length < 20 ||
  ["undefined", "null", "n/a"].includes(val.trim().toLowerCase());

const getPhaseDetails = asyncHandler(async (req, res) => {
  const { roadmapRequestId, phaseId } = req.body;

  if (!roadmapRequestId || !phaseId) {
    throw new ApiError(400, "roadmapRequestId and phaseId are required");
  }

  // 1) Return cached phase if exists
  const existing = await PhaseDetail.findOne({ roadmapRequestId, phaseId });
  if (existing) {
    return res.status(200).json({ success: true, data: existing });
  }

  // 2) Fetch generated roadmap
  const roadmap = await GeneratedRoadmap.findOne({ roadmapRequestId }).lean();
  if (!roadmap || !roadmap.structured) {
    throw new ApiError(404, "Generated roadmap not found");
  }

  // 3) Normalize structured JSON
  let structured = roadmap.structured;
  if (typeof structured === "string") {
    try {
      structured = JSON.parse(structured);
    } catch {
      throw new ApiError(500, "Stored roadmap JSON is corrupted");
    }
  }

  if (!Array.isArray(structured.phases)) {
    throw new ApiError(500, "Invalid roadmap structure (phases missing)");
  }

  // 4) Extract requested phase
  const phase = structured.phases.find((p) => p.id === phaseId);
  if (!phase) {
    throw new ApiError(404, `Phase ${phaseId} not found`);
  }

  const phaseTitle = phase.label || phase.title || phase.name || `Phase ${phaseId}`;

  // 5) Generate phase details via AI
  const aiResult = await generatePhaseDetailsFromAI({
    phase: { ...phase, label: phaseTitle }, // enforce label exists for prompt
    roadmapTitle: structured.title || structured.roadmapTitle || "Learning Roadmap",
  });

  const summary = aiResult?.summary;
  const resources = Array.isArray(aiResult?.resources) ? aiResult.resources : [];

  if (isBadText(summary)) {
    throw new ApiError(500, "AI returned invalid phase summary");
  }

  // 6) Persist phase detail
  const phaseDetail = await PhaseDetail.findOneAndUpdate(
    { roadmapRequestId, phaseId },
    {
        roadmapRequestId,
        phaseId,
        title: phaseTitle,
        summary: summary.trim(),
        resources,
        ai_metadata: {
            provider: "openai",
            model: "gpt-4o-mini",
            temperature: 0.3,
            prompt_version: "v2-json-phase",
        },
    }, {upsert: true, new: true}
);

  return res.status(200).json({ success: true, data: phaseDetail });
});

export { getPhaseDetails };
