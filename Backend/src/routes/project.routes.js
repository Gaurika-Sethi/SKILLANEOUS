import express from "express";
import { generateProject, regenerateProject } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/generate", generateProject);

router.post("/:requestId/regenerate", regenerateProject);

export default router;