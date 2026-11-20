import { machine } from "../config/ai.config.js";

export const aiPlay = async (prompt, file = null) => {
  try {
    let answer = prompt;

    if (file) {
      answer = [
        {
          type: "text",
          text: prompt,
        },
        {
          type: "file",
          file: {
            filename: file.originalname || "resume.pdf",
            file_data: `data:application/pdf;base64,${file.data.toString("base64")}`,
          },
        },
      ];
    }

    const result = await machine.generateContent(answer);

    return result.response.text();
  } catch (err) {
    throw "api토큰을 변경해야 합니다.";
  }
};
