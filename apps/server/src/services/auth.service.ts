import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { User } from "../types";

const JWT_SECRET = process.env.JWT_TOP_SECRET || "default_secret";

// Rename the function to avoid conflict
export const loginUserService = async (
  username: string,
  password: string
): Promise<{ user: User | null; token: string; sessionId: string } | null> => {
  const user = await UserModel.findOne({ username });

  if (!user || user.password !== password) {
    return null;
  }

  const sessionId = uuidv4();
  const token = jwt.sign({ userId: user.userId }, JWT_SECRET, {
    expiresIn: "6h",
  });

  user.sessionId = sessionId;
  user.token = token;
  await user.save(); // Save the user with the updated sessionId and token

  return { user, token, sessionId };
};

export const registerUser = async (
  username: string,
  password: string
): Promise<{ user: User; token: string; sessionId: string }> => {
  // Check if user already exists
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const sessionId = uuidv4();
  const newUser = new UserModel({
    userId: `user-${Date.now()}`, // You might want to let MongoDB handle this
    username,
    password, // Save password in plain text
    sessionId,
    token: "", // Token will be set later on login
    status: "offline",
  });

  const token = jwt.sign({ userId: newUser.userId }, JWT_SECRET, {
    expiresIn: "6h",
  });
  newUser.token = token;

  await newUser.save(); // Save the new user to the database

  return { user: newUser, token, sessionId };
};
