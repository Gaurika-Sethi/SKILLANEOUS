import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createResumeData } from "../controllers/resumeData.controller.js";
import { generateResume } from "../controllers/generatedResume.controller.js";

const router = Router();

// Route to submit resume data with photo upload
router.post("/create-data", upload.single("photo"), createResumeData);

router.post(
  "/generate-ai",
  (req, res, next) => {
    console.log("🔥 /generate-ai HIT");
    next(); // 👈 THIS is the key
  },
  generateResume
);


export default router;