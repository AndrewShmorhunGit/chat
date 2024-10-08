import mongoose, { Schema, Document } from "mongoose";
import { Chat } from "../types";

const chatSchema = new Schema({
  chatId: {
    type: Number,
    required: true,
    unique: true,
  },
  chatType: {
    type: String,
    enum: ["group", "private"],
    required: true,
  },
  groupName: {
    type: String,
    required: false,
  },
  participants: {
    type: [Number],
    required: true,
  },
});

export const ChatModel = mongoose.model<Chat & Document>("Chat", chatSchema);
