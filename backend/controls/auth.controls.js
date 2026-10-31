import { AuthServices } from "../services/auth.services.js";
import fs from "fs";
import { accessTokenUpdate } from "../utils/cookie.utils.js";
import { createjwt } from "../utils/jwt.utils.js";

export const AuthControl = {
  // 이력서 업로드
  resume: async (req, res) => {
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfBase64 = pdfBuffer.toString("base64");

    try {
      let user = await AuthServices.resume({
        mimeType: "application/pdf",
        data: pdfBase64,
      });

      let token = await createjwt({ phone_num: user.phone_num });
      accessTokenUpdate(res, token);

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ err: error });
    }
  },
  // 유저 정보 가져오기
  getUserByPhone: async (req, res) => {
    let { phone_num } = req.body;
    try {
      let user = await AuthServices.getUserByPhone(phone_num);

      let token = await createjwt({ phone_num: user.phone_num });
      accessTokenUpdate(res, token);

      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ err: error });
    }
  },
};
