export interface User {
  userId: string;
  username: string;
  password: string;
  sessionId: string;
  token: string;
}

export interface Message {
  messageId: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Chat {
  chatId: string;
  participants: string[];
  messages: Message[];
}

export interface ChatData {
  users: User[];
  chats: Chat[];
}

export interface SuccessResponse<T> {
  status: "success";
  data: T;
}

export interface ErrorResponse {
  status: "error";
  error: string;
}

export type ResponseType<T> = SuccessResponse<T> | ErrorResponse;
