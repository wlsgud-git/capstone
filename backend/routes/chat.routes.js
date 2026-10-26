import express from "express";
import { ChatControl } from "../controls/chat.controls.js";
import { authMiddleware, checkSession } from "../middleware/auth.middleware.js";

const router = express.Router();

// 채팅방
router.get("/", checkSession, ChatControl.getChatrooms);
router.get("/:id", checkSession, ChatControl.getChatroom);
router.post("/", checkSession, ChatControl.createChatroom);
router.delete("/:id", checkSession, ChatControl.deleteChatroom);

export default router;
