import mongoose from "mongoose";

const subtopicDetailSchema = new mongoose.Schema(
  {
    roadmapRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneratedRoadmap",
      required: true,
      index: true,
    },

    phaseId: {
      type: String,
      required: true,
      index: true,
    },

    topicTitle: {
      type: String,
      required: true,
      index: true,
    },

    subtopicTitle: {
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
    },

    whyItMatters: {
      type: String,
      required: true,
    },

    explanation: {
      type: String,
      required: true,
    },

    keyConcepts: {
      type: [String],
      default: [],
    },

    stepsToLearn: {
      type: [String],
      default: [],
    },

    commonMistakes: {
      type: [String],
      default: [],
    },

    miniProject: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      deliverables: { type: [String], default: [] },
    },

    resources: [
      {
        type: {
          type: String,
          enum: ["article", "video", "docs", "course"],
          required: true,
        },
        title: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

    ai_metadata: {
      provider: String,
      model: String,
      temperature: Number,
      prompt_version: String,
    },
  },
  { timestamps: true }
);

subtopicDetailSchema.index(
  { roadmapRequestId: 1, phaseId: 1, topicTitle: 1, subtopicTitle: 1 },
  { unique: true }
);

export const SubtopicDetail = mongoose.model("SubtopicDetail", subtopicDetailSchema);