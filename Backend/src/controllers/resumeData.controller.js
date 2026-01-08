import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ResumeData } from "../models/resumeData.model.js";
import jwt from "jsonwebtoken";

// Submit resume data
const submitResumeData = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const resumeData = req.body;
    resumeData.user = userId;


    return res.status(201).json(
        new ApiResponse(
            200,
            newResumeData,
            "Resume data submitted successfully."
        )
    );
});

export { submitResumeData };