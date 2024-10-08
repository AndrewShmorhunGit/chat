import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Avatar,
} from "@mui/material";
import { Chat } from "@utils/types";

interface ChatListProps {
  chats: Chat[];
  currentUser: string;
  onSelectChat: (chatId: string) => void;
  selectedChatId: string | null;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  currentUser,
  onSelectChat,
  selectedChatId,
}) => {
  return (
    <Box>
      <Typography variant="h6">Chats</Typography>
      <List>
        {chats.length > 0 ? (
          chats.map((chat) => {
            const isGroupChat = chat.chatType === "group";
            const displayName = isGroupChat
              ? chat.groupName || "Unnamed Group"
              : chat.participants.find((p) => p.participant !== currentUser)
                  ?.participant || "Unknown User";
            const chatType = isGroupChat ? "Group" : "Private";
            const avatarLetter = displayName.charAt(0).toUpperCase();

            return (
              <ListItem key={chat.chatId} disablePadding>
                <ListItemButton
                  component="div"
                  onClick={() => onSelectChat(chat.chatId)}
                  selected={selectedChatId === chat.chatId}
                >
                  <Avatar sx={{ mr: 2 }}>{avatarLetter}</Avatar>
                  <ListItemText primary={displayName} secondary={chatType} />
                </ListItemButton>
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <ListItemText primary="No chats." />
          </ListItem>
        )}
      </List>
    </Box>
  );
};
