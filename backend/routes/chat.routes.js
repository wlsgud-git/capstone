import express from "express";
import { ChatControl } from "../controls/chat.controls.js";
import { authMiddleware, checkSession } from "../middleware/auth.middleware.js";

const router = express.Router();

// 채팅방
router.get("/", authMiddleware, ChatControl.getChatrooms);
router.get("/:id", authMiddleware, ChatControl.getChatroom);
router.post("/", authMiddleware, ChatControl.createChatroom);
router.delete("/:id", authMiddleware, ChatControl.deleteChatroom);

export default router;
