import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import { Logout, AddCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ChatList } from "@components/Chat/ChatList";
import { ChatView } from "@components/Chat/ChatView";
import { Chat } from "@utils/types";
import { getUsersChats } from "../services/api";
import {
  Body2Typography,
  H2Typography,
} from "@components/Typography/Typography";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import WebSocketClient from "../services/websocket.client";
import { ChatCreationDialog } from "@components/Dialogs/CreateChatDialog";

enum StatusEnum {
  ONLINE = "online",
  OFFLINE = "offline",
  CONNECTING = "connecting",
}

const ConnectionStatus = ({ status }: { status: StatusEnum }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box
        sx={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor:
            status === StatusEnum.ONLINE
              ? "green"
              : status === StatusEnum.OFFLINE
                ? "red"
                : "orange",
          marginRight: "8px",
        }}
      />
      <Body2Typography>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Body2Typography>
    </Box>
  );
};

export function UserChat() {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useLocalStorageState<
    string | null
  >("chat", null);
  const [currentUser, setCurrentUser] = useState<string>("User");
  const [userId, setUserId] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<StatusEnum>(
    StatusEnum.CONNECTING
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  useEffect(() => {
    const wsClient = new WebSocketClient("ws://localhost:3002", () => {
      setConnectionStatus(StatusEnum.ONLINE);
    });

    wsClient.socket.onclose = () => {
      setConnectionStatus(StatusEnum.OFFLINE);
    };

    wsClient.socket.onopen = () => {
      setConnectionStatus(StatusEnum.ONLINE);
    };

    return () => {
      wsClient.close();
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  const handleDialogClose = (newChat: Chat | null) => {
    setIsDialogOpen(false);
    if (newChat) {
      setChats((prevChats) => [...prevChats, newChat]);
    }
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
        <ConnectionStatus status={connectionStatus} />
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
            currentUserId={userId}
            onSelectChat={handleSelectChat}
            selectedChatId={selectedChatId}
          />
          <Box display="flex" justifyContent="center">
            <IconButton color="secondary" onClick={() => setIsDialogOpen(true)}>
              <AddCircle />
            </IconButton>
            <ChatCreationDialog
              open={isDialogOpen}
              onClose={handleDialogClose}
              currentUserId={userId}
            />
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
