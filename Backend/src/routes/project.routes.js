import express from "express";
import { generateProject, regenerateProject, getProjectById } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/generate", generateProject);

router.post("/:requestId/regenerate", regenerateProject);

// Fetch generated project by its id
router.get("/:projectId", getProjectById);

export default router;