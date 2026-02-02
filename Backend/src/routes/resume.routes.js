import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createResumeData } from "../controllers/resumeData.controller.js";
import { generateResume } from "../controllers/generatedResume.controller.js";
import { aiLimiter } from "../utils/aiLimiter.js";

const router = Router();

// Route to submit resume data with photo upload
router.post("/create-data", upload.single("photo"), createResumeData);

router.post(
  "/generate-ai",
  aiLimiter,
  (req, res, next) => {
    console.log("🔥 /generate-ai HIT");
    next();
  },
  generateResume
);


export default router;