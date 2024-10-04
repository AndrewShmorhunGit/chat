import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const dataFilePath = path.join(__dirname, "../data/data.json");

const getData = () => {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
};

router.get("/chats", (req: Request, res: Response) => {
  const sessionId = req.headers["session-id"] as string;

  if (!sessionId) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  const data = getData();

  const user = data.users.find((u: any) => u.sessionId === sessionId);

  if (!user) {
    return res.status(401).json({ error: "Invalid session" });
  }

  const userId = user.userId;

  const userChats = data.chats.filter((chat: any) =>
    chat.participants.includes(userId)
  );

  res.json(userChats);
});

export default router;
