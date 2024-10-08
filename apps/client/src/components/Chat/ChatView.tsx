import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";
import { Chat } from "@utils/types";
import { sendMessage } from "../../services/api";
import WebSocketClient from "../../services/websocket.client";

interface ChatViewProps {
  chat: Chat | null;
  userId: string;
}

export const ChatView: React.FC<ChatViewProps> = ({ chat, userId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(chat?.messages || []);

  useEffect(() => {
    const wsClient = new WebSocketClient(
      "ws://localhost:3002",
      (newMessage) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            _id: newMessage._id,
            messageId: newMessage.messageId,
            chatId: newMessage.chatId,
            senderId: newMessage.senderId,
            timestamp: newMessage.timestamp,
            content: newMessage.content,
            type: newMessage.type,
            senderName: newMessage.senderName,
          },
        ]);
      }
    );

    // Очищаем соединение при размонтировании компонента
    return () => {
      wsClient.close(); // Предполагаем, что у вас есть метод close в WebSocketClient
    };
  }, []); // Пустой массив зависимостей, чтобы запускался один раз при монтировании

  useEffect(() => {
    // При изменении чата обновляем сообщения
    if (chat) {
      setMessages(chat.messages);
    }
  }, [chat]);

  const handleSendMessage = async () => {
    if (message.trim() && chat) {
      const senderId = userId;
      const chatId = chat.chatId;
      try {
        await sendMessage(chatId.toString(), senderId, message);
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  if (!chat) {
    return (
      <Box>
        <Typography variant="body1">Choose a chat</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6">
        Chat with: {chat.participants.map((p) => p.participant).join(", ")}
      </Typography>
      {messages.length > 0 ? (
        messages.map((msg) => (
          <Box key={msg._id}>
            <Typography>
              <strong>{msg.senderName}: </strong>
              {msg.content}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body1">No messages in this chat.</Typography>
      )}

      {/* Message input field */}
      <Box mt={2} display="flex" flexDirection="column">
        <TextField
          label="Type a message"
          variant="outlined"
          fullWidth
          multiline
          maxRows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Box mt={1} display="flex" justifyContent="flex-end">
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            aria-label="send message"
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
