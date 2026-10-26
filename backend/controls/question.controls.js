import { AuthServices } from "../services/auth.services.js";
import { ChatServices } from "../services/chat.services.js";
import { QuestionServices } from "../services/question.services.js";

export const questionControl = {
  // 질문 관련 ------------------------------
  getQuestions: async (req, res) => {
    let { id } = req.query;
    try {
      const questions = await QuestionServices.getQuestions(id);
      return res.status(200).json({ questions });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createQuestions: async (req, res) => {
    let { chatroom_id, objective } = req.body;
    try {
      const questions = await QuestionServices.createQuestions(
        req.phone_num,
        chatroom_id,
        objective,
      );
      return res.status(200).json({ questions });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // 피드백 받기
  getFeedback: async (req, res) => {
    let { question_id, answer } = req.body;

    try {
      let feedback = await QuestionServices.getFeedback(question_id, answer);
      return res.status(200).json({ feedback });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
};
