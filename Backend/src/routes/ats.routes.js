import express from "express";
import {
 analyzeResume,
 generateParameters
} from "../controllers/ats.controller.js";

import { uploadResume } from "../middlewares/uploadResume.middleware.js";

const router = express.Router();

// 🔥 FINAL ATS PIPELINE
// POST /api/ats/analyze
router.post(
 "/analyze",
 uploadResume.single("resume"),
 analyzeResume
);

// 🧪 STEP 2 TESTING (AI parameter generation)
// POST /api/ats/parameters
router.post("/parameters", generateParameters);

export default router;