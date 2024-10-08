import mongoose, { Schema, Document } from "mongoose";
import { Message } from "../types";

const messageSchema = new Schema({
  messageId: {
    type: String,
    required: true,
    unique: true,
  },
  chatId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "image", "video"],
    default: "text",
  },
});

export const MessageModel = mongoose.model<Message & Document>(
  "Message",
  messageSchema
);
