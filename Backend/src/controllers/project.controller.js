import { ProjectRequest } from "../models/projectRequest.model.js";
import { GeneratedProject } from "../models/generatedProject.model.js";
import { generateProjectWithAI } from "../utils/projectAI.js";
import { sanitizeGeneratedProject } from "../utils/sanitizeGeneratedProject.js";

const generateProject = async (req, res) => {
  try {
    const {
      targetRole,
      skillLevel,
      learningObjective,
      techStack,
      outputPreference,
      deploymentPreference,
    } = req.body;

    if (!targetRole || !skillLevel || !learningObjective) {
      return res.status(400).json({
        success: false,
        message: "targetRole, skillLevel, learningObjective are required",
      });
    }

    // 1) Save input
    const requestDoc = await ProjectRequest.create({
      targetRole,
      skillLevel,
      learningObjective,
      techStack: techStack || [],
      outputPreference: outputPreference || [],
      deploymentPreference: deploymentPreference || [],
    });

    // 2) Generate using OpenAI
    const { generatedProject, ai_metadata } = await generateProjectWithAI({
      targetRole,
      skillLevel,
      learningObjective,
      techStack: techStack || [],
      outputPreference: outputPreference || [],
      deploymentPreference: deploymentPreference || [],
    });

    // 3) Save output
    const generatedDoc = await GeneratedProject.create({
      projectRequestId: requestDoc._id,
      ...generatedProject,
      ai_metadata,
    });

    // 4) Return response (clean)
    return res.status(201).json({
      success: true,
      data: {
        requestId: requestDoc._id,
        projectId: generatedDoc._id,
        project: generatedProject, // ✅ send clean object to frontend
      },
    });
  } catch (error) {
    console.error("generateProject error:", error);

    const status = error?.statusCode || 500;

    return res.status(status).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};

export { generateProject };