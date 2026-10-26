import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import { corsOption } from "./config/cors.config.js";
import cors from "cors";
import session from "express-session";
import { sessionOption } from "./config/session.config.js";

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── 미들웨어 ──────────────────────────────
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use(session(sessionOption));

// ── 라우터 ───────────────────────────────
import authRouter from "./routes/auth.routes.js";
import chatRouter from "./routes/chat.routes.js";
import questionRouter from "./routes/question.routes.js";

app.use("/auth", authRouter);
app.use("/chatroom", chatRouter);
app.use("/question", questionRouter);

// ── 페이지 라우트 ─────────────────────────

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(port, () => {
  console.log(`서버 실행 중: http://localhost:${port}`);
});
