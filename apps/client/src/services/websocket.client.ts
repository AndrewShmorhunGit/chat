import { Message } from "@utils/types";

class WebSocketClient {
  socket: WebSocket;

  constructor(url: string, onUpdateMessages: (messages: Message) => void) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);

      if (message.type === "UPDATE_MESSAGES") {
        onUpdateMessages(message.messages); // Вызываем функцию обновления сообщений
      }
    };

    this.socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  sendMessage(message: object) {
    this.socket.send(JSON.stringify(message));
  }

  close() {
    this.socket.close();
  }
}

export default WebSocketClient;
