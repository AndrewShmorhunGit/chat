import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { getUserChats } from "../controllers/chat.controller";

const router = Router();

router.get("/chats", authenticateToken, getUserChats);

export default router;
