import express from "express";
import { createRoadmapRequest } from "../controllers/roadmap.controller.js";
import { generateRoadmap, getCuratedRoadmap, getRoadmapById } from "../controllers/generatedRoadmap.controller.js";
import { getTopicSummary } from "../controllers/topicSummary.controller.js";
import { getSubtopicDetails } from "../controllers/subtopicDetails.controller.js";

const router = express.Router();

router.post("/create-data", createRoadmapRequest);

router.post("/generate-roadmap", generateRoadmap);

router.post("/topic-summary", getTopicSummary);

router.post("/subtopic-details", getSubtopicDetails);

router.post("/curated", getCuratedRoadmap);

router.post("/:id", getRoadmapById);

export default router;