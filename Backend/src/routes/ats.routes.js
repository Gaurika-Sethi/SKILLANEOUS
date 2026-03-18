import express from "express";
import { analyzeResume } from "../controllers/ats.controller.js";
import { uploadResume } from "../middlewares/uploadResume.middleware.js";
import { generateParameters } from "../controllers/ats.controller.js";
import { evaluateResumeController } from "../controllers/ats.controller.js";

const router = express.Router();

// POST /ats/ats-analyze
router.post("/ats-analyze", uploadResume.single("resume"), analyzeResume);
router.post("/generate-parameters", generateParameters);
router.post("/evaluate-resume", evaluateResumeController);

export default router;