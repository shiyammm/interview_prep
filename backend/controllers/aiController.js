import { GoogleGenAI } from "@google/genai";
import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/prompt.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generate interview questions and answers using gemini
// POST /api/ai/generate-questions
export const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = questionAnswerPrompt(
            role,
            experience,
            topicsToFocus,
            numberOfQuestions
        );

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt
        });

        let rawText = response.text;

        if (!rawText) {
            return res
                .status(500)
                .json({ message: "No content returned from AI" });
        }

        const cleanedText = rawText
            .replace(/^```json\s*/i, "") // Remove starting ```json
            .replace(/```[\s\n]*$/, "") // Remove ending ``` (even with newline)
            .trim(); // Remove any extra spaces

        const data = JSON.parse(cleanedText);

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message
        });
    }
};

// Generate explains a interview question
// POST /api/ai/generate-explanation
export const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const prompt = conceptExplainPrompt(question);
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents: prompt
        });

        let rawText = response.text;
        if (!rawText) {
            return res
                .status(500)
                .json({ message: "No content returned from AI" });
        }

        const cleanedText = rawText
            .replace(/^```json\s*/, "") // remove starting ``` json
            .replace(/```$/, "") // remove ending ```
            .trim(); // remove extra spaces

        const data = JSON.parse(cleanedText);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Failed to generate questions",
            error: error.message
        });
    }
};
