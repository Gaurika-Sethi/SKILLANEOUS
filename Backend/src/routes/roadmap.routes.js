import express from "express";
import { createRoadmapRequest } from "../controllers/roadmap.controller.js";
import { generateRoadmap } from "../controllers/generatedRoadmap.controller.js";

const router = express.Router();

router.post("/create-data", createRoadmapRequest);

router.post("/generate-roadmap", generateRoadmap);

export default router;