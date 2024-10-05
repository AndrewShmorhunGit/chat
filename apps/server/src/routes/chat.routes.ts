import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { getChats } from "../controllers/chat.controller";

const router = Router();

router.get("/chats", authenticateToken, getChats);

export default router;
