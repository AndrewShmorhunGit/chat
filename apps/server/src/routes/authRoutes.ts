import { Router } from "express";
import fs from "fs";
import path from "path";

const router = Router();
const dataFilePath = path.join(__dirname, "../data/data.json");

// Чтение данных
const getData = () => {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
};

// Маршрут для авторизации пользователя
router.post("/login", (req, res) => {
  const { name } = req.body;
  const data = getData();
  const user = data.users.find((u: any) => u.name === name);

  if (user) {
    // Возвращаем данные сессии
    res.json({ sessionId: user.sessionId, userId: user.userId });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

export default router;
