import express from "express";
import { ChatControl } from "../controls/chat.controls.js";
import { authMiddleware, checkSession } from "../middleware/auth.middleware.js";
import { questionControl } from "../controls/question.controls.js";

const router = express.Router();

// 질문관련
router.get("/", checkSession, questionControl.getQuestions);
router.post("/", checkSession, questionControl.createQuestions);
router.post("/feedback", checkSession, questionControl.getFeedback);
// router.get("/room/:chat_id", authMiddleware, ChatControl.getMessages);
// router.post("/question", authMiddleware, ChatControl.sendQuestion);

export default router;
