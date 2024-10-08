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

interface Participants {
  [userId: string]: string;
}

export interface Message {
  _id: string;
  messageId: string;
  chatId: string;
  senderId: string;
  timestamp: string;
  content: string;
  type: string;
}

export interface Chat {
  _id: string;
  chatId: string;
  chatType: "group" | "private";
  groupName?: string;
  participants: Participants;
  __v: number;
  messages: Message[];
}

export interface ChatData {
  chatUser: string;
  userId: string;
  chats: Chat[];
}
