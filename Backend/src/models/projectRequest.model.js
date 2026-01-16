import mongoose from "mongoose";

const projectRequestSchema = new mongoose.Schema(
  {
    targetRole: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    skillLevel: {
      type: String,
      required: true,
      enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
      index: true,
    },

    learningObjective: {
      type: String,
      required: true,
      trim: true,
    },

    techStack: {
      type: [String],
      required: true,
      default: [],
      index: true,
    },

    outputPreference: {
      type: [String],
      required: true,
      default: [],
      enum: ["RESUME_READY", "PORTFOLIO", "GITHUB", "DEPLOYABLE", "NO_PREF"],
    },

    deploymentPreference: {
      type: [String],
      required: true,
      default: [],
      enum: ["NONE", "CLOUD", "DOCKER", "CICD", "NO_PREF"],
    },
  },
  { timestamps: true }
);

// Optional: Add compound index to speed filtering (you can change fields)
projectRequestSchema.index({ targetRole: 1, skillLevel: 1, timeCommitment: 1 });

export const ProjectRequest = mongoose.model(
  "ProjectRequest",
  projectRequestSchema
);