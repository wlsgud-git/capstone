import { config } from "./env.config.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

// const genAI = new GoogleGenerativeAI(config.ai.open_api_key);
// export const machine = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: config.ai.api_key,
});

export const machine = {
  async generateContent(prompt) {
    try {
      const response = await openrouter.chat.completions.create({
        model: "google/gemini-2.5-pro",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      return {
        response: {
          text: () => response.choices[0].message.content,
        },
      };
    } catch (err) {
      throw err;
    }
  },
};
