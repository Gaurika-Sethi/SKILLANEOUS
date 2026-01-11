import { ResumeData } from "../models/resumeData.model.js";
import { GeneratedResume } from "../models/generatedResume.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { buildResumeGenerationPrompt } from "../utils/resumePrompt.js";
import { generateResumeFromAI } from "../utils/ai.js";
import { safeJsonParse } from "../utils/json.js";

import { normalizeGeneratedResumeContent } from "../utils/normalizeGeneratedResume.util.js";
import { renderResumeHtml } from "../utils/resumeTemplate.util.js";
import { generatePdfFromHtml } from "../utils/pdf.util.js";

const generateResume = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { resumeDataId, targetRole, templateType, tone } = req.body;

    if (!resumeDataId) throw new ApiError(400, "resumeDataId is required.");
    if (!templateType) throw new ApiError(400, "templateType is required.");

    const resumeData = await ResumeData.findById(resumeDataId).lean();
    if (!resumeData) throw new ApiError(404, "Resume data not found.");

    // Prompt
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

    if (!aiResponse || typeof aiResponse !== "object") {
        throw new ApiError(500, "AI returned invalid JSON.");
    }

    // Normalize content
    const normalized = normalizeGeneratedResumeContent(aiResponse);

    // Save normalized content
    const generatedResume = await GeneratedResume.create({
        resumeDataId,
        userId,
        targetRole: targetRole || "",
        templateType,
        tone: tone || "professional",
        content: normalized,
        ai_metadata: {
            provider: "openai",
            model,
            prompt_version: "v1",
            temperature: 0.2,
        },
    });

  // Render + PDF
    const html = renderResumeHtml({ templateType, data: normalized });
    const pdfBuffer = await generatePdfFromHtml(html);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename="resume-${templateType}.pdf"`
    );

    return res.status(200).send(pdfBuffer);
});

export { generateResume };