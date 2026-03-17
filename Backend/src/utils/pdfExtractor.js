import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

const normalizeText = (text) => {
  return text
    .replace(/\s+/g, " ")   // remove excessive spaces
    .replace(/\n+/g, " ")   // remove line breaks
    .trim()
    .toLowerCase();
};

const extractResumeText = async (fileBuffer) => {
  const data = await pdf(fileBuffer);

  const cleanedText = normalizeText(data.text);

  return cleanedText;
};

export { extractResumeText };