import dotenv from "dotenv";
dotenv.config();

const required = (key, defaultValue) => {
  let value = process.env[key] || defaultValue;
  if (!value) throw new Error("해당 환경변수는 존재하지 않습니다.");
  return value;
};

export let config = {
  http: {
    client_host: required("CLIENT_HOST"),
  },

  database: {
    user: required("DB_USER"),
    password: required("DB_PASSWORD"),
    host: required("DB_HOST"),
    database: required("DB_DATABASE"),
    port: required("DB_PORT"),
  },

  session: {
    text: required("SESSION_TEXT"),
  },
  ai: {
    api_key: required("GEMINI_API_KEY"),
  },
};
