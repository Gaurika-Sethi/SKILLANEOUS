import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createResumeData } from "../controllers/resumeData.controller.js";
import { generateResume } from "../controllers/generatedResume.controller.js";

const router = Router();

// Route to submit resume data with photo upload
router.post("/create-data", verifyJWT, upload.single("photo"), createResumeData);

router.post("/generate-ai", verifyJWT, generateResume);

export default router;