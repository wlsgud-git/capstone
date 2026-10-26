import { AuthServices } from "../services/auth.services.js";
import { ChatServices } from "../services/chat.services.js";
import { QuestionServices } from "../services/question.services.js";

export const ChatControl = {
  // 채팅방 관련 -------------------------------

  // 채팅방 가져오기
  getChatrooms: async (req, res) => {
    try {
      const chatrooms = await ChatServices.getChatrooms(req.phone_num);
      res.status(200).json({ chatrooms });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // 특정 채팅방 가져오기
  getChatroom: async (req, res) => {
    try {
      let { id } = req.params;
      const chatroom = await ChatServices.getChatroom(req.phone_num, id);
      res.status(200).json({ chatroom });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // 채팅방 만들기
  createChatroom: async (req, res) => {
    try {
      let { objective } = req.body;
      let chatroom = await ChatServices.createChatroom(
        req.phone_num,
        objective,
      );

      await QuestionServices.createQuestions(
        req.phone_num,
        chatroom.id,
        objective,
      );

      res.status(201).json({ chatroom });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  // 채팅방 삭제하기
  deleteChatroom: async (req, res) => {
    try {
      let { id } = req.params;
      await ChatServices.deleteChatroom(req.phone_num, id);

      res.status(200).json({ message: "삭제가 완료되었습니다." });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
