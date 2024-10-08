import { Request, Response } from "express";
import { createChatService, getChatsForUser } from "../services/chat.service";
import { wss } from "../server";

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

export const createChat = async (req: Request, res: Response) => {
  const { chatType, participants, groupName } = req.body;

  try {
    const newChat = await createChatService(chatType, participants, groupName);

    const chatResponse = {
      chatId: newChat.chatId,
      chatType: chatType,
      groupName: chatType === "group" ? groupName : undefined,
      participants: participants.reduce(
        (acc: { [key: string]: string }, userId: string) => {
          acc[userId] = "";
          return acc;
        },
        {}
      ),
      messages: [],
    };

    // wss.clients.forEach((client) => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     client.send(
    //       JSON.stringify({
    //         type: "CHAT_CREATED",
    //         chat: {
    //           chatId: newChat.chatId,
    //           chatType,
    //           groupName,
    //           participants,
    //         },
    //       })
    //     );
    //   }
    // });

    res.status(201).json(chatResponse);
    return;
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Failed to create chat" });
    return;
  }
};
