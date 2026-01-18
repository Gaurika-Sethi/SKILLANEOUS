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
      default: null,
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

    roadmapType: {
      type: String,
      enum: ["curated", "community"],
      default: "community",
    },
    
    isDefault: {
      type: Boolean,
      default: false,
    },

    card: {
      level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
      title: { type: String, required: true },
      desc: { type: String, required: true },
      tags: { type: [String], default: [] }, 
      role: { type: String, required: true },
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

generatedRoadmapSchema.index({ roadmapType: 1, isDefault: 1, visibility: 1 });

export const GeneratedRoadmap = mongoose.model(
  "GeneratedRoadmap",
  generatedRoadmapSchema
);
