import { Request, Response } from "express";
import { addMessage, getMessagesByChatId } from "../services/message.service";
import { wss } from "../server";
import WebSocket from "ws";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, senderId, content } = req.body;
    const message = await addMessage(chatId, senderId, content);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "NEW_MESSAGE",
            chatId,
            message: {
              _id: message._id,
              chatId,
              senderId,
              timestamp: message.timestamp,
              content,
              type: "text",
              messageId: message.messageId,
            },
          })
        );
      }
    });

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
