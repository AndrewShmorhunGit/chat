import { WebSocketServer, WebSocket } from "ws";
import fs from "fs";
import path from "path";

// Имитация MongoDB через чтение данных из JSON-файла
const dataFilePath = path.join(__dirname, "../data/data.json");

const getData = () => {
  const data = fs.readFileSync(dataFilePath, "utf8");
  return JSON.parse(data);
};

const saveData = (newData: any) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2), "utf8");
};

export const setupWebSocket = (wss: WebSocketServer) => {
  wss.on("connection", (ws: WebSocket) => {
    console.log("New WebSocket connection");

    // Обработка полученных сообщений
    ws.on("message", (message) => {
      const parsedMessage = JSON.parse(message.toString());
      const { userId, chatId, content } = parsedMessage;

      // Эмулируем запись сообщения в "базу данных"
      const data = getData();
      const newMessage = {
        messageId: Date.now(),
        chatId,
        senderId: userId,
        timestamp: new Date().toISOString(),
        content,
        type: "text",
      };

      data.messages.push(newMessage);
      saveData(data);

      // Транслируем сообщение всем подключенным пользователям
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newMessage));
        }
      });
    });

    ws.on("close", () => {
      console.log("Connection closed");
    });
  });
};
