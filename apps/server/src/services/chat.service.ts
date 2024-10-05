import fs from "fs/promises";
import path from "path";
import { ChatData, Chat } from "../types";

const dataFilePath = path.join(__dirname, "../data/data.json");

export const getData = async (): Promise<ChatData> => {
  const data = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(data);
};

export const getUserChats = async (userId: string): Promise<Chat[]> => {
  const data = await getData();
  return data.chats.filter((chat) => chat.participants.includes(userId));
};
