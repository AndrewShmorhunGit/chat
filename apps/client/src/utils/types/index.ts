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

interface Participant {
  participantId: string;
  participant: string;
}

export interface Message {
  _id: string;
  messageId: string;
  chatId: string;
  senderId: string;
  timestamp: string;
  content: string;
  type: string;
  senderName: string;
}

export interface Chat {
  _id: string;
  chatId: string;
  chatType: "group" | "private";
  groupName?: string;
  participants: Participant[];
  __v: number;
  messages: Message[];
}

export interface ChatData {
  chatUser: string;
  userId: string;
  chats: Chat[];
}
