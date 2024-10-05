import { Request, Response } from "express";
import { getData } from "../services/chat.service"; // Импортируйте getData из вашего сервиса
import { Chat, SuccessResponse, ErrorResponse } from "../types";

export const getChats = async (
  req: Request,
  res: Response<SuccessResponse<Chat[]> | ErrorResponse>
): Promise<void> => {
  try {
    const data = await getData();
    const userId = (req as any).userId;

    const userChats = data.chats.filter((chat) =>
      chat.participants.includes(userId)
    );

    res.json({
      status: "success",
      data: userChats,
    } as SuccessResponse<Chat[]>);
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: "Internal Server Error",
    } as ErrorResponse);
  }
};
