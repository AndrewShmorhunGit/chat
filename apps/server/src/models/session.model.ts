import { Schema, model } from "mongoose";

const sessionSchema = new Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

export const SessionModel = model("Session", sessionSchema);
