import { Server } from "ws";

export const setupWebSocket = (port: number) => {
  const wss = new Server({ port });

  wss.on("connection", (ws) => {
    console.log("New client connected");

    ws.on("close", () => {
      console.log("Client disconnected");
    });
  });

  return wss;
};
