import { createServer } from "http";
import { WebSocketServer } from "ws";
import app from "./app";
import { setupWebSocket } from "./services/websocket.service";

const port = 3001;

const server = createServer(app);

const wss = new WebSocketServer({ server });

setupWebSocket(wss);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
