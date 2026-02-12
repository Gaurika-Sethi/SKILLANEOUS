import Groq from "groq-sdk";
import { ApiError } from "./ApiError.js";

let client;

const getClient = () => {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) throw new ApiError(500, "Missing GROQ_API_KEY in .env");

  if (!client) {
    client = new Groq({ apiKey });
  }

  return client;
};

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
      messages: [{ role: "user", content: prompt }],
      temperature,
      max_tokens,
    });

    const text = result?.choices?.[0]?.message?.content?.trim();
    if (!text) throw new ApiError(500, "AI returned empty response.");

    return text;
  } catch (error) {
    const status = error?.status || error?.response?.status;
    const message = error?.message || "";

    if (status === 401 || /openai\s+api\s+key/i.test(message)) {
      throw new ApiError(401, "Invalid Groq API key.");
    }
    if (status === 429) throw new ApiError(429, "Groq rate limit exceeded.");

    throw new ApiError(500, message || "Failed to generate AI response.");
  }
};

export { generateFromAI };
