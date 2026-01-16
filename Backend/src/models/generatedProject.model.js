import mongoose from "mongoose";

const generatedProjectSchema = new mongoose.Schema(
  {
    projectRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectRequest",
      required: true,
      index: true,
    },

    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },

    oneLinePitch: {
      type: String,
      required: true,
      trim: true,
    },

    projectDescription: {
      type: String,
      required: true,
    },

    features: {
      type: [String],
      required: true,
      default: [],
    },

    folderStructure: {
      type: [String],
      required: true,
      default: [],
    },

    deploymentChecklist: {
      type: [String],
      required: true,
      default: [],
    },

    resumeBullets: {
      type: [String],
      required: true,
      default: [],
    },

    // optional: only if outputPreference includes GITHUB
    githubReadmeTemplate: {
      type: String,
      required: false,
    },

    ai_metadata: {
      provider: String,
      model: String,
      temperature: Number,
      prompt_version: String,
    },
  },
  { timestamps: true }
);

// ✅ One request should map to only one GeneratedProject
generatedProjectSchema.index({ projectRequestId: 1 }, { unique: true });

export const GeneratedProject = mongoose.model(
  "GeneratedProject",
  generatedProjectSchema
);