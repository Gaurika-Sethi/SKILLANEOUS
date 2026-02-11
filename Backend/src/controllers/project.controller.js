import { ProjectRequest } from "../models/projectRequest.model.js";
import { GeneratedProject } from "../models/generatedProject.model.js";
import { generateProjectWithAI } from "../utils/projectAI.js";
import { sanitizeGeneratedProject } from "../utils/sanitizeGeneratedProject.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

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

    // 2) Generate using Groq
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

const getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { requestId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(projectId) && requestId && !mongoose.Types.ObjectId.isValid(requestId)) {
      throw new ApiError(400, "Invalid id format.");
    }

    let projectDoc = null;

    // Try primary lookup by projectId
    if (mongoose.Types.ObjectId.isValid(projectId)) {
      projectDoc = await GeneratedProject.findById(projectId).lean();
    }

    // Fallback lookup by requestId (query) if provided
    if (!projectDoc && requestId && mongoose.Types.ObjectId.isValid(requestId)) {
      projectDoc = await GeneratedProject.findOne({ projectRequestId: requestId }).lean();
    }

    // Fallback: if the path param was actually requestId
    if (!projectDoc && mongoose.Types.ObjectId.isValid(projectId)) {
      projectDoc = await GeneratedProject.findOne({ projectRequestId: projectId }).lean();
    }

    if (!projectDoc) {
      throw new ApiError(404, "Project not found.");
    }

    // Fetch the originating request for contextual fields
    const requestDoc = await ProjectRequest.findById(projectDoc.projectRequestId).lean();
    const wantsGithub = Array.isArray(requestDoc?.outputPreference) && requestDoc.outputPreference.includes("GITHUB");

    const sanitized = sanitizeGeneratedProject(projectDoc, wantsGithub);

    // Merge contextual info so frontend can display meta
    if (requestDoc) {
      sanitized.targetRole = requestDoc.targetRole;
      sanitized.skillLevel = requestDoc.skillLevel;
      sanitized.techStack = requestDoc.techStack;
      sanitized.outputPreference = requestDoc.outputPreference;
      sanitized.deploymentPreference = requestDoc.deploymentPreference;
      sanitized.learningObjective = requestDoc.learningObjective;
    }

    // Expose ids for regen / navigation
    sanitized.projectId = projectDoc._id?.toString();
    sanitized.projectRequestId = projectDoc.projectRequestId?.toString();

    return res.status(200).json({
      success: true,
      data: sanitized,
    });
  } catch (error) {
    console.error("getProjectById error:", error);

    const status = error?.statusCode || 500;

    return res.status(status).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};

const regenerateProject = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      throw new ApiError(400, "Invalid requestId format.");
    }

    // 1) Find request
    const requestDoc = await ProjectRequest.findById(requestId).lean();
    if (!requestDoc) {
      throw new ApiError(404, "ProjectRequest not found.");
    }

    // 2) Delete existing generated project (replace strategy)
    await GeneratedProject.deleteOne({ projectRequestId: requestId });

    // 3) Generate fresh output via Groq
    const { generatedProject, ai_metadata } = await generateProjectWithAI({
      targetRole: requestDoc.targetRole,
      skillLevel: requestDoc.skillLevel,
      learningObjective: requestDoc.learningObjective,
      techStack: requestDoc.techStack || [],
      outputPreference: requestDoc.outputPreference || [],
      deploymentPreference: requestDoc.deploymentPreference || [],
    });

    // bump prompt version if you want (optional)
    ai_metadata.prompt_version = "project-generator-v1";

    // 4) Save new generated project
    const newGeneratedDoc = await GeneratedProject.create({
      projectRequestId: requestId,
      ...generatedProject,
      ai_metadata,
    });

    return res.status(200).json({
      success: true,
      message: "Project regenerated successfully.",
      data: {
        requestId,
        projectId: newGeneratedDoc._id,
        project: generatedProject, // ✅ clean object
      },
    });
  } catch (error) {
    console.error("regenerateProject error:", error);

    const status = error?.statusCode || 500;

    return res.status(status).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};

export { generateProject, regenerateProject, getProjectById };