import { Request, Response } from "express";
import { addMessage, getMessagesByChatId } from "../services/message.service";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, senderId, content } = req.body;
    const message = await addMessage(chatId, senderId, content);
    res.status(201).json(message);
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Failed to create message" });
  }
};

export const fetchMessagesByChatId = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId;
    const messages = await getMessagesByChatId(chatId);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
