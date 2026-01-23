


const buildProjectGeneratorPrompt = ({
  targetRole,
  skillLevel,
  learningObjective,
  techStack,
  outputPreference,
  deploymentPreference,
}) => {
  const wantsGithub = outputPreference?.includes("GITHUB");
  const wantsCloud = deploymentPreference?.includes("CLOUD");

  return `
You are an expert software engineer and project mentor.

Generate a UNIQUE project idea based on user preferences.
Return ONLY valid JSON (no markdown, no code fences).

STRICT JSON schema:
{
  "projectTitle": "string",
  "oneLinePitch": "string",
  "projectDescription": "string",
  "features": ["string", ...],
  "folderStructure": ["string", ...],
  "deploymentChecklist": ["string", ...],
  "resumeBullets": ["string", ...]${
    wantsGithub ? `,
  "githubReadmeTemplate": "string"` : ""
  }
}

Hard Rules:
- projectTitle must be catchy and specific (not generic like "StarterKit").
- Match project complexity to skill level:
  - BEGINNER: simple auth + CRUD, avoid advanced features unless required.
  - INTERMEDIATE: can include refresh tokens, RBAC, pagination, etc.
  - ADVANCED: scalable architecture, caching, queues, etc.
- Include ONLY features relevant to the learning objective.
- folderStructure must follow this style:
  - use "src/controllers/", "src/routes/", "src/models/", "src/services/", "src/utils/", "src/middlewares/", "src/config/"
  - Do NOT use "middleware" (must be "middlewares") or "service" (must be "services")
  - include at least 18-25 entries with nested paths and files (e.g., "src/controllers/auth.controller.js", "src/routes/auth.routes.js", "src/models/user.model.js", "src/services/auth.service.js", "src/utils/logger.js", "src/middlewares/auth.middleware.js", "src/config/db.js", "src/tests/auth.test.js", "scripts/seed.js", "docs/README.md") so the structure feels complete
- If techStack is specified, use ONLY those technologies.
- If techStack is empty, choose popular modern stack suitable for the targetRole and skillLevel.
- Add a "slug" field derived from projectTitle must be lowercase, hyphen separated.
- If deploymentPreference includes "CICD", include GitHub Actions in deploymentChecklist.
- If githubReadmeTemplate is included, it must include an ".env.example" section.
- If the tech stack is backend-only (Node/Express/Mongo), do NOT mention UI features like responsive design.
- deploymentChecklist MUST follow deploymentPreference:
  - If CLOUD not selected, DO NOT mention AWS/Heroku/Vercel/Render
- Keep output concise:
  - features: 4 to 6 items
  - resumeBullets: exactly 3 items
  - deploymentChecklist: 3 to 6 items
- If githubReadmeTemplate is included, it must be a complete README markdown as ONE string.

User Preferences:
- Target Role: ${targetRole}
- Skill Level: ${skillLevel}
- Learning Objective: ${learningObjective}
- Tech Stack: ${JSON.stringify(techStack)}
- Output Preference: ${JSON.stringify(outputPreference)}
- Deployment Preference: ${JSON.stringify(deploymentPreference)}
`.trim();
};

export { buildProjectGeneratorPrompt };