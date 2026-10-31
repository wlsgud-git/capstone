import express from "express";
import { ChatControl } from "../controls/chat.controls.js";
import { authMiddleware, checkSession } from "../middleware/auth.middleware.js";
import { questionControl } from "../controls/question.controls.js";

const router = express.Router();

// 질문관련
router.get("/", authMiddleware, questionControl.getQuestions);
router.post("/", authMiddleware, questionControl.createQuestions);
router.post("/feedback", authMiddleware, questionControl.getFeedback);
// router.get("/room/:chat_id", authMiddleware, ChatControl.getMessages);
// router.post("/question", authMiddleware, ChatControl.sendQuestion);

export default router;
