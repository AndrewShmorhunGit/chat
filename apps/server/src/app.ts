import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import chatRoutes from "./routes/chat.routes";
import usersRoutes from "./routes/users.routes";
import messageRoutes from "./routes/message.routes";
import connectDB from "./db";

const app = express();

app.use(express.json());

connectDB();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/auth", authRoutes);
app.use("/api", chatRoutes);
app.use("/api", usersRoutes);
app.use("/api", messageRoutes);

export default app;
