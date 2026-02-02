import rateLimit from "express-rate-limit";

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5, // max 5 AI requests per IP per minute
  message: {
    success: false,
    message: "Too many AI requests. Please wait a minute and try again."
  },
  standardHeaders: true,
  legacyHeaders: false,
});