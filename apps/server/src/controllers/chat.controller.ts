import { Request, Response } from "express";
import { getChatsForUser } from "../services/chat.service";

interface RequestWithId extends Request {
  userId?: string;
}

export const getUserChats = async (req: RequestWithId, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({
      status: "error",
      message: "User ID is required",
    });
    return;
  }
  try {
    const chats = await getChatsForUser(userId);
    res.json({ status: "success", data: chats });
  } catch (error) {
    console.error("Error getting user chats:", error);
    res.status(500).json({ status: "error", message: "Failed to get chats" });
  }
};
