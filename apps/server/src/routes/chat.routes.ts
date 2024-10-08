import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { createChat, getUserChats } from "../controllers/chat.controller";

const router = Router();

router.get("/chats", authenticateToken, getUserChats);
router.post("/chats/create", authenticateToken, createChat);

export default router;
