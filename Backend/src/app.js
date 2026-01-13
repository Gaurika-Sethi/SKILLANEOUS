import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials: true,
}));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes would be added here
import userRoutes from './routes/user.routes.js';
app.use('/api/v1/users', userRoutes);

import resumeRoutes from './routes/resume.routes.js';
app.use('/api/v1/resume', resumeRoutes);

import roadmapRoutes from './routes/roadmap.routes.js';
app.use('/api/v1/roadmap', roadmapRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error("🔥 GLOBAL ERROR HANDLER:", err);
    
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

export {app};