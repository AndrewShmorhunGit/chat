import fs from "fs/promises";
import path from "path";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { ChatData, User } from "../types";

const dataFilePath = path.join(__dirname, "../data/data.json");
const JWT_SECRET = process.env.JWT_TOP_SECRET || "default_secret";

const getChatData = async (): Promise<ChatData> => {
  const data = await fs.readFile(dataFilePath, "utf8");
  return JSON.parse(data);
};

const saveData = async (data: ChatData): Promise<void> => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2));
};

export const loginUser = async (
  username: string,
  password: string
): Promise<{ user: User | null; token: string; sessionId: string } | null> => {
  const data = await getChatData();
  const sessionId = uuidv4();

  const user = data.users.find((u) => u.username === username);

  if (
    !user ||
    !password /* !(await bcrypt.compare(password, user.password))*/
  ) {
    return null;
  }

  const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
    expiresIn: "6h",
  });

  user.sessionId = sessionId;
  user.token = token;
  await saveData(data);

  return { user, token, sessionId };
};

export const registerUser = async (
  username: string,
  password: string
): Promise<{ user: User; token: string; sessionId: string }> => {
  const data = await getChatData();
  const sessionId = uuidv4();

  // Check if user already exists
  const existingUser = data.users.find((u) => u.username === username);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser = {
    userId: `user-${Date.now()}`,
    username,
    password,
    sessionId,
    token: "",
    status: "offline",
  } as User;

  const token = jwt.sign({ userId: newUser.userId }, JWT_SECRET, {
    expiresIn: "6h",
  });
  newUser.token = token;

  data.users.push(newUser);
  await saveData(data);

  return { user: newUser, token, sessionId };
};
