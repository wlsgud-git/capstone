import { config } from "./env.config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(config.ai.api_key);
export const machine = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });