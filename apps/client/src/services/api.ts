import { UsersData, User } from "@utils/types";
import axios from "axios";

export const API_URL = "http://localhost:3001";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/users`);
    const usersData: UsersData = response.data;
    const users = usersData.data;
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
