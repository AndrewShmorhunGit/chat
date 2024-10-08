import express from "express";
import { authenticateToken } from "../middleware/auth";
import {
  createMessage,
  fetchMessagesByChatId,
} from "../controllers/message.controller";

const router = express.Router();

router.post("/message", authenticateToken, createMessage);
router.get("/messages/:chatId", authenticateToken, fetchMessagesByChatId);

export default router;
