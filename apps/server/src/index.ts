import express from "express";
import { WebSocketServer } from "ws";
import { createServer } from "http";
import path from "path";
import fs from "fs";

// Импортируем роуты для авторизации
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";

// Импортируем WebSocket логику
import { setupWebSocket } from "./services/websocketService";

// Создаем Express-приложение
const app = express();
const port = 3001;

// Создаем HTTP-сервер и WebSocket сервер
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Используем JSON формат для запросов
app.use(express.json());

// Маршруты
app.use("/auth", authRoutes);
app.use("/api", chatRoutes);

// Логика взаимодействия с WebSocket
setupWebSocket(wss);

// Запуск сервера
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
