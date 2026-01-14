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


  const existing = await PhaseDetail.findOne({ roadmapRequestId, phaseId });
  if (existing) {
    return res.status(200).json({
      success: true,
      data: existing,
    });
  }

  const roadmap = await GeneratedRoadmap.findById(roadmapRequestId);
  if (!roadmap) {
    throw new ApiError(404, "Roadmap not found");
  }

  const aiResult = await generatePhaseDetailsFromAI({
    roadmapMarkdown: roadmap.markdown,
    phaseId,
  });

  const phaseDetail = await PhaseDetail.create({
    roadmapRequestId,
    phaseId,
    ...aiResult,
    ai_metadata: {
      provider: "openai",
      model: "gpt-4o-mini",
      temperature: 0.3,
      prompt_version: "v1",
    },
  });

  return res.status(200).json({
    success: true,
    data: phaseDetail,
  });
});

export { getPhaseDetails };