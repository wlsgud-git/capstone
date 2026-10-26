import { machine } from "../config/ai.config.js";
import { config } from "../config/env.config.js";

export const aiPlay = async (prompt, file = null) => {
  try {
    const answer = file
      ? [
          { text: prompt },
          {
            inlineData: {
              mimeType: file.mimeType,
              data: file.data,
            },
          },
        ]
      : prompt;

    const result = await machine.generateContent(answer);

    return result.response.text();
  } catch (err) {
    throw err;
  }
};

async function askAI(prompt, file = null) {
  const contents = file
    ? [
        { text: prompt },
        {
          inlineData: {
            mimeType: file.mimeType,
            data: file.data,
          },
        },
      ]
    : prompt;

  const result = await model.generateContent(contents);

  return result.response.text();
}
