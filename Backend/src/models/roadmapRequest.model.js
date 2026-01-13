import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  years: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
  },
});

const roadmapRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    targetField: {
      type: String,
      required: true,
    },
    primaryPurpose: {
      type: String,
      required: true,
    },

    skills: {
      type: [skillSchema],
      default: [],
    },

    specificFocus: {
      type: String,
      default: "",
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  { timestamps: true }
);

export const RoadmapRequest = mongoose.model(
  "RoadmapRequest",
  roadmapRequestSchema
);