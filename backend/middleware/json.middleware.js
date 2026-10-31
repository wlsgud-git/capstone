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
