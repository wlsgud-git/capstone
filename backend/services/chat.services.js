import { ChatData } from "../data/chat.data.js";

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
      return ChatData.createChatroom(phone_num, objective);
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
