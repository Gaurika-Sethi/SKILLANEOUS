import OpenAI from "openai";
import { ApiError } from "./ApiError.js";

let client;

const getClient = () => {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
        throw new ApiError(500, "Missing OPENAI_API_KEY in .env");
    }
    if (!client) client = new OpenAI({ apiKey });
    return client;
};

const generateResumeFromAI = async ({
    prompt,
    model = "gpt-4o-mini",
    temperature = 0.2,
}) => {
    try {
        const openai = getClient();

        const result = await openai.chat.completions.create({
            model,
            messages: [{ role: "user", content: prompt }],
            temperature,
            max_tokens: 2500,
        });

    const text = result?.choices?.[0]?.message?.content?.trim();
    if (!text) throw new ApiError(500, "AI returned empty response.");
    return text;
} catch (error) {
    const status = error?.status;

    if (status === 401) throw new ApiError(401, "Invalid OpenAI API key.");
    if (status === 429) throw new ApiError(429, "Rate limit/quota exceeded.");

    throw new ApiError(500, error?.message || "Failed to generate AI response.");
}
};

export { generateResumeFromAI };


import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ Reusable AI helper for both resume & roadmap

async function generateRoadmapFromAI({ prompt, model, temperature }) {
  try {
    const response = await openai.chat.completions.create({
      model,
      temperature,
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("❌ OpenAI API error:", error);
    throw new Error("AI generation failed");
  }
}

export { generateRoadmapFromAI };