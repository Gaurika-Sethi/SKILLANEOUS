import express from "express";
import { createRoadmapRequest } from "../controllers/roadmap.controller.js";
import { generateRoadmap } from "../controllers/generatedRoadmap.controller.js";
import { getPhaseDetails } from "../controllers/roadmapPhase.controller.js";
import { getSubtopicDetails } from "../controllers/subtopicDetails.controller.js";

const router = express.Router();

router.post("/create-data", createRoadmapRequest);

router.post("/generate-roadmap", generateRoadmap);

router.post("/phase-details", getPhaseDetails);

router.post("/subtopic-details", getSubtopicDetails);

export default router;