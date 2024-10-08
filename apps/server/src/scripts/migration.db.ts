import mongoose from "mongoose";
import { UserModel } from "../models/user.model";
import { MessageModel } from "../models/message.model";
import { ChatModel } from "../models/chat.model";
import { SessionModel } from "../models/session.model"; // Import the SessionModel
import data from "../data/data.json";

const migrateDataToDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/chat_db"
    );

    // Migrate users
    const users = data.users.map((user) => ({
      userId: user.userId,
      username: user.username,
      password: user.password,
      sessionId: user.sessionId,
      token: user.token,
      status: user.status,
    }));

    await UserModel.insertMany(users);
    console.log("Users migrated successfully!");

    // Migrate messages
    const messages = data.messages.map((message) => ({
      messageId: message.messageId,
      chatId: message.chatId,
      senderId: message.senderId,
      timestamp: message.timestamp,
      content: message.content,
      type: message.type,
    }));

    await MessageModel.insertMany(messages);
    console.log("Messages migrated successfully!");

    // Migrate chats
    const chats = data.chats.map((chat) => ({
      chatId: chat.chatId,
      chatType: chat.chatType,
      groupName: chat.groupName,
      participants: chat.participants,
    }));

    await ChatModel.insertMany(chats);
    console.log("Chats migrated successfully!");

    // Migrate sessions
    const sessions = data.sessions.map((session) => ({
      sessionId: session.sessionId,
      userId: session.userId,
      startTime: session.startTime,
      token: session.token,
    }));

    await SessionModel.insertMany(sessions);
    console.log("Sessions migrated successfully!");
  } catch (error) {
    console.error("Error migrating data:", error);
  } finally {
    mongoose.connection.close();
  }
};

migrateDataToDB();
