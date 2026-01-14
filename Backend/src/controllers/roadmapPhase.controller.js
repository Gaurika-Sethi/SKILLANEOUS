import { GeneratedRoadmap } from "../models/generatedRoadmap.model.js";
import { PhaseDetail } from "../models/phaseDetail.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generatePhaseDetailsFromAI } from "../utils/phaseAI.js";

const getPhaseDetails = asyncHandler(async (req, res) => {
  const { roadmapRequestId, phaseId } = req.body;

  if (!roadmapRequestId || !phaseId) {
    throw new ApiError(400, "roadmapRequestId and phaseId are required");
  }

  /* 1️⃣ Return cached phase if exists */
  const existing = await PhaseDetail.findOne({ roadmapRequestId, phaseId });
  if (existing) {
    return res.status(200).json({
      success: true,
      data: existing,
    });
  }

  /* 2️⃣ Fetch generated roadmap */
  const roadmap = await GeneratedRoadmap.findOne({ roadmapRequestId }).lean();
  if (!roadmap || !roadmap.structured) {
    throw new ApiError(404, "Generated roadmap not found");
  }

  /* 3️⃣ Normalize structured JSON */
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

  /* 4️⃣ Extract requested phase */
  const phase = structured.phases.find((p) => p.id === phaseId);
  if (!phase) {
    throw new ApiError(404, `Phase ${phaseId} not found`);
  }

  /* 5️⃣ Generate phase details via AI */
  const aiResult = await generatePhaseDetailsFromAI({
    phase,
    roadmapTitle: structured.title,
  });

  /* 6️⃣ Persist phase detail */
  const phaseDetail = await PhaseDetail.create({
    roadmapRequestId,
    phaseId,
    title: phase.label,
    ...aiResult,
    ai_metadata: {
      provider: "openai",
      model: "gpt-4o-mini",
      temperature: 0.3,
      prompt_version: "v2-json-phase",
    },
  });

  return res.status(200).json({
    success: true,
    data: phaseDetail,
  });
});

export { getPhaseDetails };
