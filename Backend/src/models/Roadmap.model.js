import mongoose, { Schema } from "mongoose";

const roadmapSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // USER INPUTS
    fieldToWorkIn: {
      type: String,
      required: true,
      trim: true,
    },

    existingSkills: [
      {
        skill: {
          type: String,
          required: true,
          trim: true,
        },
        years: {
          type: Number,
          required: true,
          min: 0,
          max: 60,
        },
      },
    ],

    purpose: {
      type: String,
      required: true,
      trim: true,
    },

    whatToLearn: {
      type: String,
      default: "",
      trim: true,
    },

    existingSkillsProjectLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
      default: "beginner",
    },

    timeline: {
      value: {
        type: Number,
        required: true,
        min: 1,
        max: 120,
      },
      unit: {
        type: String,
        enum: ["weeks", "months"],
        required: true,
        default: "months",
      },
    }
  })