import { generateFromAI } from "../utils/ai.js";
import { ApiError } from "../utils/ApiError.js";
import { buildProjectGeneratorPrompt } from "../utils/projectGenerator.js";
import { sanitizeGeneratedProject } from "./sanitizeGeneratedProject.js";

const generateProjectWithAI = async (payload) => {
  const prompt = buildProjectGeneratorPrompt(payload);

  const text = await generateFromAI({
    prompt,
    model: "gpt-4o-mini",
    temperature: 0.3,
    max_tokens: 2500,
    json: true,
  });

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new ApiError(500, "AI output was not valid JSON.");
  }

  // ✅ strict field validation (defensive)
  const required = [
    "projectTitle",
    "oneLinePitch",
    "projectDescription",
    "features",
    "folderStructure",
    "deploymentChecklist",
    "resumeBullets",
  ];

  for (const k of required) {
    if (parsed?.[k] === undefined || parsed?.[k] === null) {
      throw new ApiError(500, `AI output missing required field: ${k}`);
    }
  }

  // Ensure arrays
  ["features", "folderStructure", "deploymentChecklist", "resumeBullets"].forEach(
    (k) => {
      if (!Array.isArray(parsed[k])) parsed[k] = [];
    }
  );

  // Optional field cleanup:
  const wantsGithub = payload?.outputPreference?.includes("GITHUB");
  parsed = sanitizeGeneratedProject(parsed, wantsGithub);
  if (!wantsGithub) delete parsed.githubReadmeTemplate;

  return {
    generatedProject: parsed,
    ai_metadata: {
      provider: "openai",
      model: "gpt-4o-mini",
      temperature: 0.3,
      prompt_version: "v1",
    },
  };
};

export { generateProjectWithAI };