import mongoose from "mongoose";

const phaseDetailSchema = new mongoose.Schema(
  {
    roadmapRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneratedRoadmap",
      required: true,
    },

    phaseId: {
      type: String,
      required: true,
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
          enum: ["article", "video", "docs"],
          required: true,
        },
        title: String,
        url: String,
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

phaseDetailSchema.index({ roadmapRequestId: 1, phaseId: 1 }, { unique: true });

export const PhaseDetail = mongoose.model(
  "PhaseDetail",
  phaseDetailSchema
);