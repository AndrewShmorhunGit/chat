import mongoose, { Schema, Document } from "mongoose";
import { User } from "../types";

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
});

export const UserModel = mongoose.model<User & Document>("User", userSchema);
