import { Server } from "ws";
import WebSocket from "ws";
import { getMessagesByChatId } from "../services/message.service";

export const setupWebSocket = (port: number) => {
  const wss = new Server({ port });

  wss.on("connection", (ws: WebSocket) => {
    console.log("New client connected");

    ws.on("message", async (message) => {
      const parsedMessage = JSON.parse(message.toString());

      if (parsedMessage.type === "SEND_MESSAGE") {
        const { chatId, userId, content } = parsedMessage;

        // Отправка сообщения всем участникам чата
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "NEW_MESSAGE",
                chatId,
                userId,
                content,
                timestamp: new Date().toISOString(),
              })
            );
          }
        });

        // Получаем все сообщения после отправки нового сообщения
        const messages = await getMessagesByChatId(chatId);
        // Рассылаем обновленный список сообщений всем участникам чата
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "UPDATE_MESSAGES",
                chatId,
                messages, // отправляем обновленный список сообщений
              })
            );
          }
        });
      }
    });

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  return wss;
};
