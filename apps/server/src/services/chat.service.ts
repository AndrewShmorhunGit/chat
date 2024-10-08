import { ChatModel } from "../models/chat.model";
import { MessageModel } from "../models/message.model";
import { UserModel } from "../models/user.model";
import { Chat } from "../types";

interface Participants {
  [userId: string]: string; // ключ - userId, значение - userName
}

export const getChatsForUser = async (userId: string) => {
  const chats = await ChatModel.find({ participants: userId });
  const user = await UserModel.findOne({ userId });
  const chatUser = user?.username || "Unknown User";

  const chatDetails = await Promise.all(
    chats.map(async (chat) => {
      const messages = await MessageModel.find({ chatId: chat.chatId });

      // Создаем объект участников
      const participantsDetails: Participants = {};
      for (const participantId of chat.participants) {
        const participant = await UserModel.findOne({ userId: participantId });
        participantsDetails[participantId] = participant?.username || "Unknown";
      }

      return {
        ...chat.toObject(),
        participants: participantsDetails,
        messages: messages.map((msg) => msg.toObject()),
      };
    })
  );

  return {
    chatUser,
    userId,
    chats: chatDetails,
  };
};

export const createChatService = async (
  chatType: string,
  participants: string[],
  groupName?: string
): Promise<Chat> => {
  const newChat = new ChatModel({
    chatId: `chat-${Date.now()}`,
    chatType,
    participants,
    groupName,
  });

  await newChat.save();

  return newChat;
};
