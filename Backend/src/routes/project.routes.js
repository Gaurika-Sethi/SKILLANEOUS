import express from "express";
import { generateProject, regenerateProject, getProjectById } from "../controllers/project.controller.js";
import { aiLimiter } from "../utils/aiLimiter.js";

const router = express.Router();

router.post("/generate", aiLimiter, generateProject);
router.post("/:requestId/regenerate", aiLimiter, regenerateProject);

// Fetch generated project by its id
router.get("/:projectId", getProjectById);

export default router;