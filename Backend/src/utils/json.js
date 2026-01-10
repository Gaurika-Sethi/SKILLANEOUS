import {ApiError} from "./ApiError.js";

const safeJsonParse= (jsonString, defaultValue=null)=>{
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        const start= text.indexOf("{");
        const end= text.lastIndexOf("}");

        if (start === -1 || end === -1) {
            throw new ApiError(500, "AI response does not contain valid JSON.");
    }

    const jsonString= text.slice(start, end + 1);

    try {
        return JSON.parse(jsonString);
    } catch {
        throw new ApiError(500, "Failed to parse JSON from AI response.");
    }
}}

export {safeJsonParse};