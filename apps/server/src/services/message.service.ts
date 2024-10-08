import { MessageModel } from "../models/message.model";
import { v4 as uuidv4 } from "uuid"; // Используем UUID для генерации уникального идентификатора

// Функция для добавления сообщения в БД
export const addMessage = async (
  chatId: string,
  senderId: string,
  content: string
) => {
  const message = new MessageModel({
    chatId,
    senderId,
    timestamp: new Date().toISOString(),
    content,
    type: "text", // для текста
    messageId: uuidv4(), // Генерация уникального messageId
  });
  return await message.save();
};

// Функция для получения сообщений по chatId
export const getMessagesByChatId = async (chatId: string) => {
  return await MessageModel.find({ chatId }).populate("senderId");
};
