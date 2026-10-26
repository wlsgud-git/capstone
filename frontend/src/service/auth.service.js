import { HttpClient } from "../network/http";

export class AuthService extends HttpClient {
  // 이력서 업로드
  async resumeUpload(file) {
    try {
      let user = await this.axiosFetch("/auth/resume", {
        method: "post",
        body: file,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }
  // 폰번호로 유저 정보 가져오기
  async getUserByPhone(phone_num) {
    try {
      let user = await this.axiosFetch("/auth", {
        method: "post",
        body: JSON.stringify({ phone_num }),
      });
      return user;
    } catch (err) {
      throw err;
    }
  }

  // 테스트
  async test() {
    try {
      let user = await this.axiosFetch("/auth/test", {
        method: "get",
      });
      return user;
    } catch (err) {
      throw err;
    }
  }
}

export const auth_service = new AuthService();
