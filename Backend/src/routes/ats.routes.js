import express from "express";
import { analyzeResume } from "../controllers/ats.controller.js";
import { uploadResume } from "../middlewares/uploadResume.middleware.js";

const router = express.Router();

// POST /ats/ats-analyze
router.post("/ats-analyze", uploadResume.single("resume"), analyzeResume);

export default router;