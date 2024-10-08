import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  useTheme,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { Chat, Message } from "@utils/types";
import { sendMessage } from "../../services/api";
import WebSocketClient from "../../services/websocket.client";
import {
  Body1Typography,
  Subtitle1Typography,
} from "@components/Typography/Typography";
import notificationSound from "../../assets/sounds/Bell.mp3";

interface ChatViewProps {
  chat: Chat | null;
  userId: string;
}

export const ChatView: React.FC<ChatViewProps> = ({ chat, userId }) => {
  const theme = useTheme();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chat?.messages || []);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const notifyNewMessage = () => {
    const audio = new Audio(notificationSound);
    audio.play().catch((error) => console.error("Error playing sound:", error));
  };

  useEffect(() => {
    const wsClient = new WebSocketClient(
      "ws://localhost:3002",
      (newMessage: Message | Message[]) => {
        // Если новое сообщение - это массив, обновляем сообщения
        if (Array.isArray(newMessage)) {
          setMessages(newMessage);
        } else {
          // Если новое сообщение - одиночное сообщение
          if (newMessage.senderId !== userId) {
            notifyNewMessage();
          }
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      }
    );

    return () => {
      wsClient.close();
    };
  }, [userId]);

  useEffect(() => {
    if (chat) {
      setMessages(chat.messages);
    }
  }, [chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() && chat) {
      try {
        await sendMessage(chat.chatId, userId, message);
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  if (!chat) {
    return <Body1Typography>Choose a chat</Body1Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" pb={1}>
        {Object.values(chat.participants).join(", ")}
      </Typography>

      <Box
        sx={{
          height: "50vh",
          flexGrow: 1,
          overflowY: "auto",
          padding: "1em",
          bgcolor: theme.palette.background.paper,
          borderRadius: 1,
          boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
          marginBottom: "1em",
        }}
      >
        {messages.map((msg) => {
          const isUserMessage = msg.senderId === userId;
          const senderName = chat.participants[msg.senderId];

          return (
            <Box
              key={msg._id}
              sx={{
                display: "flex",
                justifyContent: isUserMessage ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  bgcolor: isUserMessage
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main,
                  color: theme.palette.primary.contrastText,
                  borderRadius: 2,
                  p: 1.5,
                  whiteSpace: "pre-line",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                }}
              >
                {!isUserMessage && (
                  <Subtitle1Typography>{senderName}</Subtitle1Typography>
                )}
                <Typography variant="body1">{msg.content}</Typography>
              </Box>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Type a message"
          maxRows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ width: "calc(100% - 4rem)" }}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
};
