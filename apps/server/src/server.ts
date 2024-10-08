import { createServer } from "http";
import app from "./app";
import { setupWebSocket } from "./services/websocket.service";

const httpPort = 3001;
const wsPort = 3002;

const httpServer = createServer(app);

httpServer.listen(httpPort, () => {
  console.log(`HTTP Server is running on http://localhost:${httpPort}`);
});

export const wss = setupWebSocket(wsPort);
