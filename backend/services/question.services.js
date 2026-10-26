import { QuestionData } from "../data/question.data.js";
import { extractJson } from "../middleware/auth.middleware.js";
import { aiPlay } from "../utils/ai.utils.js";
import { AuthServices } from "./auth.services.js";

export const QuestionServices = {
  // 질문 관련 -----------------------------
  getQuestions: async (chatroom_id) => {
    try {
      return QuestionData.getQuestions(chatroom_id);
    } catch (err) {
      throw err;
    }
  },

  // 질문 생성
  createQuestions: async (phone_num, chatroom_id, objective) => {
    try {
      let user = await AuthServices.getUserByPhone(phone_num);
      let q = await QuestionServices.getQuestions(chatroom_id);
      let before_q = await q.map((val) => val.question);

      let propmt = `
      조건)
        1.${JSON.stringify(user)}가 JSON형태로 된 유저의 정보이다
        2.유저 정보를 토대로 희망분야인 ${objective}와 관련된 면접 질문을 5개로 순서대로 넘겨준다.
        3.${JSON.stringify(before_q)}안 질문들과 새로 생성할 질문들은 절대 겹치지 않도록 하며 JSON 형태로 준다 
        4.key값은 questions라는 이름으로하고 그 value는 그 질문들 리스트를 배열로 준다.
      `;
      let result = await aiPlay(propmt);
      let info_json = await extractJson(result);

      await QuestionData.createQuestions(
        phone_num,
        chatroom_id,
        info_json.questions,
      );
      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  // 특정 질문 가져오기
  getFeedback: async (question_id, answer) => {
    try {
      let question = await QuestionData.getQuestionDetail(question_id);
      let propmt = `
        Q. ${question.question}
        A. ${answer}

        1. 질문에 대한 응답에 대하여 피드백 해 줘
        2. 피드백은 JSON 즉 {feedback: []} key값이 feedback이고 []안에 피드백은 반드시 텍스트로만 이루어지게 줘.
      `;

      let result = await aiPlay(propmt);
      let info_json = await extractJson(result);
      let feedback = await info_json.feedback;

      await QuestionData.modifyAnswer(question_id, answer, feedback);

      return feedback;
    } catch (err) {
      throw err;
    }
  },
};
