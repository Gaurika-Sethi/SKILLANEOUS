import mongoose from "mongoose";

const topicSummarySchema = new mongoose.Schema(
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
      index: true,
    },
    topicTitle: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
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

topicSummarySchema.index(
  { roadmapRequestId: 1, phaseId: 1, topicId: 1 },
  { unique: true }
);

export const TopicSummary = mongoose.model("TopicSummary", topicSummarySchema);
