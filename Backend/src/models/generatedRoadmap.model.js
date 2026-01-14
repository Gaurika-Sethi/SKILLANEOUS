import mongoose from "mongoose";

const generatedRoadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    roadmapRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoadmapRequest",
      required: true,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },

    structured: {
      type: mongoose.Schema.Types.Mixed, 
      required: true,
    },

    ai_metadata: {
      provider: { type: String, default: "openai" },
      model: String,
      temperature: Number,
      prompt_version: String,
    },
  },
  { timestamps: true }
);

export const GeneratedRoadmap = mongoose.model(
  "GeneratedRoadmap",
  generatedRoadmapSchema
);
