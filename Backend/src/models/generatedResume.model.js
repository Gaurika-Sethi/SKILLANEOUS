import mongoose, { Schema } from "mongoose";

const generatedResumeSchema = new Schema({
    resumeDataId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ResumeData",
        required: true,
        index: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
        index: true,
    },
    targetRole: {
        type: String,
        default: "",
        trim: true,
    },
    templateType: {
        type: String,
        required: true,
        enum: ["modern", "ats", "creative"],
    },
    tone: {
        type: String,
        enum: ["professional", "concise", "impactful", "creative"],
        default: "professional",
    },
    content: {
        type: Schema.Types.Mixed,
        required: true,
    },
    ai_metadata: {
        model: String,
        prompt_version: String,
        temperature: Number,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => Date.now() + 1000 * 60 * 60, 
        index: {expires: 0},
    },
},{timestamps:true})

export const GeneratedResume = mongoose.model("GeneratedResume", generatedResumeSchema);