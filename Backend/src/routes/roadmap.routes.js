import express from "express";
import { createRoadmapRequest } from "../controllers/roadmap.controller.js";

const router = express.Router();

router.post("/create-data", createRoadmapRequest);
export default router;