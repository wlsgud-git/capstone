import jwt from "jsonwebtoken";
import { config } from "../config/env.config.js";

export const createjwt = async (payload) => {
  try {
    let token = await jwt.sign(payload, config.jwt.secret_key, {
      expiresIn: "1h",
    });

    return token;
  } catch (err) {
    throw "토큰 생성 중 오류가 발생하였습니다. 다시 시도해 주세요.";
  }
};
