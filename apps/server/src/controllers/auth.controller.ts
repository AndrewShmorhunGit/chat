import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/auth.service";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const loginResult = await loginUser(username, password);

    if (!loginResult || !loginResult.user) {
      res.status(401).json({ error: "Invalid username or password" });
      return;
    }

    const { user, token, sessionId } = loginResult;

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.cookie("sessionId", sessionId, { httpOnly: true, secure: true });

    res.json({
      userId: user.userId,
      username: user.username,
      sessionId,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const registerResult = await registerUser(username, password);

    if (!registerResult || !registerResult.user) {
      res.status(400).json({ error: "Registration failed" });
      return;
    }

    const { user, token, sessionId } = registerResult;

    res.cookie("token", token, { httpOnly: true, secure: true });
    res.cookie("sessionId", sessionId, { httpOnly: true, secure: true });

    res
      .status(201)
      .json({ userId: user.userId, username: user.username, sessionId, token });
  } catch (error: any) {
    if (error.message === "User already exists") {
      res.status(409).json({ error: "User with this username already exists" });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
