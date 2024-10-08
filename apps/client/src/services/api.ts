import { UsersData, User, ChatData } from "@utils/types";
import axios from "axios";

export const API_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
});

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get(`/api/users`);
    const usersData: UsersData = response.data;
    const users = usersData.data;
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const registerUser = async (credentials: {
  username: string;
  password: string;
}) => {
  const { data } = await api.post("/auth/register", credentials);
  return data;
};

export const getUsersChats = async (): Promise<ChatData> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/api/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const chats = response.data.data;
    console.log(chats);

    return chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    return { chatUser: "undefined", userId: "undefined", chats: [] };
  }
};

export const sendMessage = async (
  chatId: string,
  senderId: string,
  content: string
) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api.post(
      `/api/message`,
      {
        chatId,
        senderId,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
