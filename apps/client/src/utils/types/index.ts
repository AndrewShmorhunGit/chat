export interface User {
  userId: string;
  username: string;
  password: string;
  sessionId: string;
  token: string;
}

export interface UsersData {
  status: string;
  data: User[];
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
