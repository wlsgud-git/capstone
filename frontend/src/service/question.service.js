import { HttpClient } from "../network/http";

export class QuestionService extends HttpClient {
  // 질문 관련 ------------------------------------------------
  // 질문 보내기
  async getQuestions(id) {
    try {
      let res = await this.axiosFetch(`/question?id=${id}`, {
        method: "get",
      });

      return res.questions;
    } catch (err) {
      throw err;
    }
  }
  // 질문 추가 생성
  async createQuestions(chatroom_id, objective) {
    try {
      let res = await this.axiosFetch(`/question`, {
        method: "post",
        body: JSON.stringify({ chatroom_id, objective }),
      });

      return res.questions;
    } catch (err) {
      throw err;
    }
  }
  // 피드백 받기
  async getFeedBack(question_id, answer) {
    try {
      console.log(question_id, answer);
      let res = await this.axiosFetch(`/question/feedback`, {
        method: "post",
        body: JSON.stringify({ question_id, answer }),
      });

      return res.feedback;
    } catch (err) {
      throw err;
    }
  }
}

export const question_service = new QuestionService();
