import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { Logout, AddCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ChatList } from "@components/Chat/ChatList";
import { ChatView } from "@components/Chat/ChatView";
import { Chat } from "@utils/types";
import { getUsersChats } from "../services/api";
import { H2Typography } from "@components/Typography/Typography";

export function UserChat() {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string>("User");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchChatsData = async () => {
      const fetchedChats = await getUsersChats();
      setChats(fetchedChats.chats);
      setSelectedChatId(fetchedChats.chats[0]?.chatId || null);
      setCurrentUser(fetchedChats.chatUser);
      setUserId(fetchedChats.userId);
    };

    fetchChatsData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <H2Typography>{`Hi ${currentUser}!`}</H2Typography>
        <IconButton
          color="primary"
          onClick={handleLogout}
          sx={{ marginTop: "20px" }}
        >
          <Logout />
        </IconButton>
      </Box>
      <Box display="flex">
        <Box width="250px" borderRight={1}>
          <ChatList
            chats={chats}
            currentUser={currentUser}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChatId}
          />
          <Box display="flex" justifyContent="center">
            <IconButton
              color="secondary"
              onClick={() => alert("Add chat")}
              sx={{ marginTop: "10px" }}
            >
              <AddCircle />
            </IconButton>
          </Box>
        </Box>
        <Box flexGrow={1} padding={2}>
          <ChatView
            chat={chats.find((chat) => chat.chatId === selectedChatId) || null}
            userId={userId}
          />
        </Box>
      </Box>
    </>
  );
}
