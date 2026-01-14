import { RoadmapRequest } from "../models/roadmapRequest.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createRoadmapRequest = asyncHandler(async (req, res) => {
  console.log("🔥 createRoadmapRequest HIT");
  const {
    targetField,
    primaryPurpose,
    skills,
    specificFocus,
    visibility,
  } = req.body;

  if (!targetField || !primaryPurpose) {
    throw new ApiError(400, "targetField and primaryPurpose are required");
  }

  if (!Array.isArray(skills)) {
    throw new ApiError(400, "skills must be an array");
  }

  const roadmapRequest = await RoadmapRequest.create({
    targetField,
    primaryPurpose,
    skills,
    specificFocus,
    visibility,
    userId: null, // guest mode
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      roadmapRequest,
      "Roadmap request saved successfully"
    )
  );
});

export { createRoadmapRequest };