import {ApiError} from "./ApiError.js";

const stripCodeFences = (text) =>
    text
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

const stripTrailingCommas = (text) => text.replace(/,\s*([}\]])/g, "$1");

const extractBalancedJsonObject = (text) => {
    const start = text.indexOf("{");
    if (start === -1) return "";

    let depth = 0;
    let inString = false;
    let isEscaped = false;

    for (let i = start; i < text.length; i++) {
        const ch = text[i];

        if (isEscaped) {
            isEscaped = false;
            continue;
        }

        if (ch === "\\") {
            isEscaped = true;
            continue;
        }

        if (ch === '"') {
            inString = !inString;
            continue;
        }

        if (!inString) {
            if (ch === "{") depth += 1;
            if (ch === "}") {
                depth -= 1;
                if (depth === 0) return text.slice(start, i + 1);
            }
        }
    }

    return "";
};

const safeJsonParse = (rawText, defaultValue = null) => {
    if (rawText === null || rawText === undefined) {
        if (defaultValue !== null) return defaultValue;
        throw new ApiError(500, "AI response is empty.");
    }

    const text = String(rawText).trim();
    const candidate = stripCodeFences(text);

    try {
        return JSON.parse(candidate);
    } catch {
        const extracted = extractBalancedJsonObject(candidate);

        if (!extracted) {
            if (defaultValue !== null) return defaultValue;
            throw new ApiError(500, "AI response does not contain valid JSON.");
        }
        const cleaned = stripTrailingCommas(extracted);

        try {
            return JSON.parse(cleaned);
        } catch {
            if (defaultValue !== null) return defaultValue;
            throw new ApiError(500, "Failed to parse JSON from AI response.");
        }
    }
};

export {safeJsonParse};