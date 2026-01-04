import mongoose, { Schema } from "mongoose";

const resumeDataSchema = new Schema({
    source: {
        type: String,
        required: true,
        enum: ["form", "pdf", "docx"],
    },
    personalInfo: {
        full_name: String,
        email: String,
        phone: String,
        location: String,

        photoUrl: {
            type: string,
            default: "",
        },

        links: [{
            label: String,
            url: String,
        }],
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
            start_date: {
                type: String,
                required: true,
            },
            end_date: {
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
            tech_stack: {
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
                        enum: ["github", "live", "demo", "figma", "docs", "other"],
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
    education: [
        {
            institution: String,
            degree: String,
            location: String,
            graduation_year: String,
        },
    ],

    achievements: {
        type: [String],
        default: [],
    },

    expirationAt: {
        type: Date,
        required: true,
        default: () => Date.now() + 1000 * 60 * 10, 
        index: {expires: 0},
    },
}, {timestamps: true})

export const ResumeData = mongoose.model("ResumeData", resumeDataSchema);