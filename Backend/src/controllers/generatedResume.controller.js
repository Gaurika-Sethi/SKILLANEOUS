import { ResumeData } from "../models/resumeData.model.js";
import { GeneratedResume } from "../models/generatedResume.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { buildResumeGenerationPrompt } from "../utils/resumePrompt.js";
import { generateResumeFromAI } from "../utils/ai.js";
import { safeJsonParse } from "../utils/json.js";

const generateResume = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    
    const { resumeDataId, targetRole, templateType, tone } = req.body;

    if (!resumeDataId) {
        throw new ApiError(400, "resumeDataId is required.");
    }

    if (!templateType) {
        throw new ApiError(400, "templateType is required.");
    }

    const resumeData = await ResumeData.findById(resumeDataId).lean();

    if (!resumeData) {
        throw new ApiError(404, "Resume data not found.");
    }

    const prompt = buildResumeGenerationPrompt({
        resumeData,
        targetRole,
        templateType,
        tone,
    });

    const model = "gpt-4o-mini";

    const aiRaw = await generateResumeFromAI({
        prompt,
        model,
        temperature: 0.2,
    });

    const aiResponse = safeJsonParse(aiRaw);

    const generatedResume = await GeneratedResume.create({
        resumeDataId,
        userId,
        targetRole: targetRole || "",
        templateType,
        tone: tone || "professional",
        content: aiResponse,
        ai_metadata: {
            provider: "openai",          
            model,
            prompt_version: "v1",
            temperature: 0.2,
        },
    });

    const parsedContent = safeJsonParse(generatedResume.content);

    return res.status(201).json(
        new ApiResponse(
        201,
        generatedResume,
        "Resume generated successfully."
    )
);
});

export { generateResume };