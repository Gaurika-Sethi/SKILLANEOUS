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

    topicId: { 
      type: String, 
      required: true, 
      index: true },

    subtopicId: { 
      type: String, 
      required: true, 
      index: true 
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

    summary: {
      type: String,
      required: true,
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
  { roadmapRequestId: 1, phaseId: 1, topicId: 1, subtopicId: 1 },
  { unique: true }
);


export const SubtopicDetail = mongoose.model("SubtopicDetail", subtopicDetailSchema);