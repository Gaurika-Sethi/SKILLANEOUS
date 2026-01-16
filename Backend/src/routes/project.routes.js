import express from "express";
import { generateProject } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/generate", generateProject);

export default router;