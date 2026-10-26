import { config } from "./env.config.js";

export let sessionOption = {
  secret: config.session.text, // 아무 랜덤 문자열
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 24시간
    httpOnly: true,
  },
};
