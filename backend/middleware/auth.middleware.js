import jwt from "jsonwebtoken";
import { config } from "../config/env.config.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "로그인이 필요합니다." });

    const decoded = jwt.verify(token, config.jwt.secret_key);
    req.user = decoded; // { id, name }
    next();
  } catch (err) {
    res.status(401).json({ message: "토큰이 유효하지 않습니다." });
  }
};

// 세션 체크
export const checkSession = (req, res, next) => {
  const phone_num = req.session.phone_num;

  if (!phone_num) {
    return res.status(401).json({
      success: false,
      message: "이력서를 먼저 업로드해주세요.",
    });
  }

  req.phone_num = phone_num; // 이후 라우트에서 req.phone_num으로 바로 사용
  next();
};

// 이력서 json형태로 변환
export const extractJson = (text) => {
  // ```json ... ``` 또는 ``` ... ``` 제거
  const cleaned = text
    .replace(/```json\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  // JSON 객체 추출
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || start > end) {
    throw new Error("JSON을 찾을 수 없습니다.");
  }

  const jsonString = cleaned.slice(start, end + 1);

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error(`JSON 파싱 실패: ${error.message}`);
  }
};
