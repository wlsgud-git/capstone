import { HttpClient } from "../network/http";

export class ChatService extends HttpClient {
  // 채팅방 관련 --------------------------------------
  // 유저 채팅룸 가져오기
  async getChatrooms() {
    try {
      let result = await this.axiosFetch("/chatroom", {
        method: "get",
      });
      return result.chatrooms;
    } catch (err) {
      throw err;
    }
  }
  // 특정 채팅방 정보 가져오기
  async getChatroom(id) {
    try {
      let result = await this.axiosFetch(`/chatroom/${id}`, { method: "get" });
      return result.chatroom;
    } catch (err) {
      throw err;
    }
  }

  // 채팅방 만들기
  async createChatroom(objective) {
    try {
      return this.axiosFetch("/chatroom", {
        method: "post",
        body: JSON.stringify({ objective }),
      });
    } catch (err) {
      throw err;
    }
  }

  // 채팅방 삭제하기
  async deleteChatroom(id) {
    try {
      return this.axiosFetch(`/chatroom/${id}`, {
        method: "delete",
      });
    } catch (err) {
      throw err;
    }
  }

  // 테스트
  //   async test() {
  //     try {
  //       let user = await this.axiosFetch("/auth/test", {
  //         method: "post",
  //         body: JSON.stringify({ hi: "hi" }),
  //       });
  //       return user;
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
}

export const chat_service = new ChatService();
