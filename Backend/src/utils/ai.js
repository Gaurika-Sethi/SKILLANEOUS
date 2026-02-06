import Groq from "groq-sdk";
import { ApiError } from "./ApiError.js";

let client;

const getClient = () => {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) throw new ApiError(500, "Missing GROQ_API_KEY in .env");
  if (!client) client = new Groq({ apiKey });
  return client;
};

/**
 * ✅ Single reusable Groq helper for ALL AI features
 */
const SYSTEM_JSON_PROMPT =
  "You must respond with valid JSON only. No markdown, no extra text, no code fences. Output must be parseable by JSON.parse().";

const generateFromAI = async ({
  prompt,
  model = "llama-3.1-8b-instant",
  temperature = 0.2,
  max_tokens = 2500,
  json = false,
}) => {
  try {
    const groq = getClient();

    const result = await groq.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_JSON_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature,
      max_tokens,
      ...(json ? { response_format: { type: "json_object" } } : {}),
    });

    const text = result?.choices?.[0]?.message?.content?.trim();
    if (!text) throw new ApiError(500, "AI returned empty response.");
    return text;
  } catch (error) {
    const status = error?.status;

    if (status === 401) throw new ApiError(401, "Invalid GROQ API key.");
    if (status === 429) throw new ApiError(429, "Rate limit/quota exceeded.");

    throw new ApiError(500, error?.message || "Failed to generate AI response.");
  }
};

export { generateFromAI };
