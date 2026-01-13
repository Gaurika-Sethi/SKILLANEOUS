import { ResumeData } from "../models/resumeData.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Submit resume data
const createResumeData = asyncHandler(async (req, res) => {
    const userId = null;

    let photoUrl = "";

    console.log("REQ FILE:", req.file);

    if (req.file?.path){
        const uploadImage =  await uploadToCloudinary(req.file.path);

        if (!uploadImage) {
            throw new ApiError(500, "Image upload failed. Please try again.");
        }

        photoUrl = uploadImage.secure_url;
    }

    const personalInfo = req.body.personalInfo ? JSON.parse(req.body.personalInfo) : {};
    personalInfo.photoUrl = photoUrl || "";

    const parsedSkills = req.body.parsedSkills ? JSON.parse(req.body.parsedSkills) : [];
    const experience = req.body.experience ? JSON.parse(req.body.experience) : [];
    const projects = req.body.projects ? JSON.parse(req.body.projects) : [];
    const education = req.body.education ? JSON.parse(req.body.education) : {};
    const achievements = req.body.achievements ? JSON.parse(req.body.achievements) : [];

    const resumeData = new ResumeData({
        userId,
        personalInfo:{ ...personalInfo,photoUrl},
        summary: req.body.summary || "",
        parsedSkills,
        experience,
        projects,
        education,
        achievements,
    })

    await resumeData.save();

    return res.status(201).json(
        new ApiResponse(
            200,
            resumeData,
            "Resume data submitted successfully."
        )
    );
});



export { createResumeData };