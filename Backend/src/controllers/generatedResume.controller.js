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

    const resumeData = await ResumeData.findById(resumeDataId);

    if (!resumeData){
        throw new ApiError(404, "Resume data not found.");
    }

    // Build prompt
    const prompt = buildResumeGenerationPrompt({
        resumeData,
        targetRole,
        templateType,
        tone,
    });

    // AI call
    const aiRaw= await generateResumeFromAI({ 
        prompt,
        model: "gemini-2.5-flash-lite",
        temperature: 0.2,
    });

    // Parse AI response
    const aiResponse= safeJsonParse(aiRaw);

    // Save generated resume
    const generatedResume= new GeneratedResume({
        resumeDataId,
        userId,
        targetRole: targetRole || "",
        templateType,
        tone: tone || "professional",
        content: JSON.stringify(aiResponse),
        ai_metadata:{
            model: "gemini-2.5-flash-lite",
            prompt_version: "v1",
            temperature: 0.2,
        },
    });

    res
    .status(201)
    .json(
        new ApiResponse(
            200,
            generatedResume,
            "Resume generated successfully."
        )
    );
});

export { generateResume };