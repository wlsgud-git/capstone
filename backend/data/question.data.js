import { prisma } from "../config/prisma.js";
import { dbPlay } from "../utils/db.utils.js";

export const QuestionData = {
  // 질문 관련 --------------------------------------------
  // 질문 가져오기
  getQuestions: async (chatroom_id) => {
    try {
      let result = await prisma.question.findMany({
        where: { chatroom_id: parseInt(chatroom_id) },
        orderBy: { create_at: "asc" },
      });
      return result;
    } catch (err) {
      throw err;
    }
  },

  // 특정 질문 가져오기
  getQuestionDetail: async (question_id) => {
    try {
      let result = await prisma.question.findUnique({
        where: { id: parseInt(question_id) },
      });
      return result;
    } catch (err) {
      throw err;
    }
  },

  // 질문 생성하기
  createQuestions: async (phone_num, chatroom_id, questions) => {
    try {
      return prisma.question.createMany({
        data: questions.map((q) => ({
          chatroom_id: parseInt(chatroom_id),
          phone_num: phone_num,
          question: q,
          answer: "",
        })),
      });
    } catch (err) {
      throw err;
    }
  },

  // 답 수정
  modifyAnswer: async (question_id, answer, feedback) => {
    try {
      return prisma.question.update({
        where: { id: question_id },
        data: {
          answer,
          feedback,
        },
      });
    } catch (err) {
      throw err;
    }
  },
};
