import { RoadmapRequest } from "../models/roadmapRequest.model.js";
import { GeneratedRoadmap } from "../models/generatedRoadmap.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { buildRoadmapPrompt } from "../utils/roadmapPrompt.js";
import { generateResumeFromAI } from "../utils/ai.js"; // reuse AI util

const generateRoadmap = asyncHandler(async (req, res) => {
    const { roadmapRequestId } = req.body;

    if (!roadmapRequestId) {
        throw new ApiError(400, "roadmapRequestId is required");
    }

    const request = await RoadmapRequest.findById(roadmapRequestId).lean();
    if (!request) {
        throw new ApiError(404, "Roadmap request not found");
    }

    const prompt = buildRoadmapPrompt(request);

    const model = "gpt-4o-mini";

    const markdown = await generateResumeFromAI({
        prompt,
        model,
        temperature: 0.3,
    });

    if (!markdown || !markdown.startsWith("#")) {
        throw new ApiError(500, "AI returned invalid roadmap format");
    }

    const generated = await GeneratedRoadmap.create({
        roadmapRequestId,
        markdown,
        visibility: request.visibility,
        userId: null,
        ai_metadata: {
            provider: "openai",
            model,
            temperature: 0.3,
            prompt_version: "v1",
    },
});

    return res.status(201).json(
        new ApiResponse(
            201,
            generated,
            "Roadmap generated successfully"
    )
);
});

export { generateRoadmap };