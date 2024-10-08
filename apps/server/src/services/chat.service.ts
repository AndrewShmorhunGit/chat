import { ChatModel } from "../models/chat.model";
import { MessageModel } from "../models/message.model";
import { UserModel } from "../models/user.model";

interface Participant {
  participantId: string;
  participant: string;
}

export const getChatsForUser = async (userId: string) => {
  // Получаем чаты для данного пользователя
  const chats = await ChatModel.find({ participants: userId });

  // Получаем данные о пользователе
  const user = await UserModel.findOne({ userId });
  const chatUser = user?.username || "Unknown User";

  const chatDetails = await Promise.all(
    chats.map(async (chat) => {
      const messages = await MessageModel.find({ chatId: chat.chatId });

      const participantsDetails: Participant[] = await Promise.all(
        chat.participants.map(async (participantId) => {
          const participant = await UserModel.findOne({
            userId: participantId,
          });
          return {
            participantId,
            participant: participant?.username || "Unknown",
          };
        })
      );

      // Разрешаем все сообщения для получения senderName
      const messagesWithSenderNames = await Promise.all(
        messages.map(async (message) => {
          const sender = await UserModel.findOne({ userId: message.senderId });
          return {
            ...message.toObject(),
            senderName: sender?.username || "Unknown",
          };
        })
      );

      return {
        ...chat.toObject(),
        participants: participantsDetails,
        messages: messagesWithSenderNames,
      };
    })
  );

  return {
    chatUser,
    userId,
    chats: chatDetails,
  };
};
