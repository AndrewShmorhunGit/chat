import fs from "fs/promises";
import path from "path";
import { ChatData, Chat } from "../types";

const dataFilePath = path.join(__dirname, "../data/data.json");

export const geChatData = async (): Promise<ChatData> => {
  const data = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(data);
};
