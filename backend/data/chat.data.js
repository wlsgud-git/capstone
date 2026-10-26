import { prisma } from "../config/prisma.js";
import { dbPlay } from "../utils/db.utils.js";

export const ChatData = {
  // 채팅방 관련 ------------------------------------------------
  getChatrooms: async (phone_num) => {
    try {
      return await prisma.chatroom.findMany({
        where: { phone_num },
        orderBy: { create_at: "desc" }, // 최신 채팅방이 위로 오게
      });
    } catch (err) {
      throw err;
    }
  },

  // 특정 채팅방 가져오기
  getChatroom: async (phone_num, id) => {
    try {
      return prisma.chatroom.findUnique({
        where: { phone_num, id: Number(id) },
        include: { question: { orderBy: { create_at: "asc" } } },
      });
    } catch (err) {
      throw err;
    }
  },
  // 채팅방 만들기
  createChatroom: async (phone_num, objective) => {
    try {
      return prisma.chatroom.create({
        data: {
          phone_num,
          objective,
        },
      });
    } catch (err) {
      throw err;
    }
  },

  deleteChatroom: async (phone_num, id) => {
    try {
      return prisma.chatroom.delete({
        where: { phone_num, id: parseInt(id) },
      });
    } catch (err) {
      throw err;
    }
  },
};
