import { ChatData } from "../data/chat.data.js";
import { AuthServices } from "./auth.services.js";
import { aiPlay } from "../utils/ai.utils.js";
import { prisma } from "../config/prisma.js";
import { extractJson } from "../middleware/json.middleware.js";

export const ChatServices = {
  // 채팅방 관련 ------------------------------------------------
  getChatrooms: async (phone_num) => {
    try {
      return ChatData.getChatrooms(phone_num);
    } catch (err) {
      throw err;
    }
  },
  // 특정 채팅방 가져오기
  getChatroom: async (phone_num, id) => {
    try {
      return ChatData.getChatroom(phone_num, id);
    } catch (err) {
      throw err;
    }
  },

  // 채팅방 만들기
  createChatroom: async (phone_num, objective) => {
    try {
      let user = await AuthServices.getUserByPhone(phone_num);
      // let q = await QuestionServices.getQuestions(chatroom_id);
      // let before_q = await q.map((val) => val.question);

      let propmt = `
            조건)
              1.${JSON.stringify(user)}가 JSON형태로 된 유저의 정보이다
              2.유저 정보를 토대로 희망분야인 ${objective}와 관련된 면접 질문을 5개로 순서대로 넘겨준다.
              3.새로 생성할 질문들은 절대 겹치지 않도록 하며 JSON 형태로 준다 
              4.key값은 questions라는 이름으로하고 그 value는 그 질문들 리스트를 배열로 준다.
            `;
      let result = await aiPlay(propmt);
      let info_json = await extractJson(result);

      // 5. DB 트랜잭션
      return await prisma.$transaction(async (tx) => {
        // 채팅방 생성
        const room = await tx.chatroom.create({
          data: {
            phone_num,
            objective,
          },
        });

        // 질문 생성
        const questions = await tx.question.createMany({
          data: info_json.questions.map((question) => ({
            phone_num,
            chatroom_id: room.id,
            question,
            answer: "",
          })),
        });

        return room;
      });
    } catch (err) {
      throw err;
    }
  },

  // 채팅방 삭제
  deleteChatroom: async (phone_num, id) => {
    try {
      return ChatData.deleteChatroom(phone_num, id);
    } catch (err) {
      throw err;
    }
  },

  // 질문 관련 -----------------------------
  getQuestions: async (chatroom_id) => {
    try {
      return ChatData.getQuestions(chatroom_id);
    } catch (err) {
      throw err;
    }
  },
};
