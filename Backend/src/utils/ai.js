import {GoogleGenerativeAI} from "@google/generative-ai";
import { ApiError } from "./ApiError.js";

const genAI= new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResumeFromAI= async({
    prompt,
    model="gemini-2.5-flash-lite",
    temperature= 0.2,
})=>{
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new ApiError(500, "AI service is not configured properly.");
        }

        const geminiModel= genAI.getGenerativeModel({
            model,
            generationConfig:{temperature, maxOutputTokens:3000},
        });

        const result= await geminiModel.generateContent(prompt);
        const text= result?.response?.text()?.trim();

        if(!text){
            throw new ApiError(500, "AI service returned empty response.");
        }

        return text;
    } catch (error) {
        console.error("Error generating resume from AI:", error);
        throw new ApiError(500, error?.message || "Failed to generate resume from AI.");
    };
}

export {generateResumeFromAI};