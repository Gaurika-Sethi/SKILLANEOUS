import { ResumeData } from "../models/resumeData.model.js";
import { GeneratedResume } from "../models/generatedResume.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { buildResumeGenerationPrompt } from "../utils/resumePrompt.js";
import { generateFromAI } from "../utils/ai.js";
import { safeJsonParse } from "../utils/json.js";

import { normalizeGeneratedResumeContent } from "../utils/normalizeGeneratedResume.js";
import { renderResumeHtml } from "../utils/resumeTemplate.js";
import { generatePdfFromHtml } from "../utils/pdf.js";

const generateResume = asyncHandler(async (req, res) => {
        console.log("🟢 generateResume controller entered");
        console.log("BODY:", req.body);
        const userId = null;
        const { resumeDataId, targetRole, templateType, tone } = req.body;
        console.log("Fetching ResumeData");
    
        if (!resumeDataId) throw new ApiError(400, "resumeDataId is required.");
        if (!templateType) throw new ApiError(400, "templateType is required.");
    
        const resumeData = await ResumeData.findById(resumeDataId).lean();
        if (!resumeData) throw new ApiError(404, "Resume data not found.");
    
        console.log("Building prompt");
        const prompt = buildResumeGenerationPrompt({
            resumeData,
            targetRole,
            templateType,
            tone,
        });

        console.log("Calling AI");
        const model = "gpt-4o-mini";
    
        const aiRaw = await generateFromAI({
            prompt,
            model,
            temperature: 0.2,
        });
        console.log("AI RAW ok");

        console.log("Parsing AI response");
        const aiResponse = safeJsonParse(aiRaw);
        console.log("AI parsed ok");
    
        if (!aiResponse || typeof aiResponse !== "object") {
            throw new ApiError(500, "AI returned invalid JSON.");
        }
    
        // Normalize content
        const normalized = normalizeGeneratedResumeContent(aiResponse);
        normalized.personalInfo.photoUrl = resumeData?.personalInfo?.photoUrl || "";
        
        if (templateType === "creative"&& !normalized.personalInfo.photoUrl) {
            throw new ApiError(400, "Photo is required for the creative template.");
        }
    
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
    
        console.log("PHOTO URL IN NORMALIZED:", normalized?.personalInfo?.photoUrl);
    
        console.log("🧩 Rendering HTML");
        const html = renderResumeHtml({ templateType, data: normalized });
        console.log("✅ HTML rendered, length:", html.length);
        
        console.log("🖨️ Generating PDF");
        const pdfBuffer = await generatePdfFromHtml(html);
        console.log("✅ PDF generated, size:", pdfBuffer.length);
    
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="resume.pdf"`
        );
    
        return res.status(200).send(pdfBuffer);
});

export { generateResume };