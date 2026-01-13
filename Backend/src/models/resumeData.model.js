import mongoose, { Schema } from "mongoose";

const resumeDataSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
        default: null,
    },

    personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        location: String,
        links: [
                {
                    label: {
                        type: String,
                        default: "",
                    },
                    url: {
                        type: String,
                        default: "",
                    },
                },
            ],

        photoUrl: {
            type: String,
            default: "",
        },
    },
    summary: {
        type: String,
        default: "",
    },

    parsedSkills: {
        type: [String],
        default: [],
    },
    experience: [
        {
            role: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            startDate: {
                type: String,
                required: true,
            },
            endDate: {
                type: String,
                required: true,
            },
            description: {
                type: [String],
                default: [],
            },
        }],
    projects: [
        {
            title: {
                type: String,
                required: true,
            },
            techStack: {
                type: [String],
                default: [],
            },
            description: {
                type: [String],
                default: [],
            },
            duration: {
                type: String,
                default: "",
            },
            links: [
                {
                    type: {
                        type: String,
                        enum: ["github", "live", "demo", "figma", "other"],
                        default: "other",
                    },
                    url: {
                        type: String,
                        default: "",
                    },
                },
            ],
        },
    ],

    education: {
        institution: String,
        degree: String,
        location: String,
        graduationYear: String,
    },

    achievements: {
        type: [String],
        default: [],
    },
}, {timestamps: true});

export const ResumeData = mongoose.model("ResumeData", resumeDataSchema);