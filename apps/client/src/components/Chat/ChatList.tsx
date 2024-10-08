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
  currentUserId: string;
  onSelectChat: (chatId: string) => void;
  selectedChatId: string | null;
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  currentUserId,
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
            let displayName: string;

            if (isGroupChat) {
              displayName = chat.groupName || "Unnamed Group";
            } else {
              // Находим другого участника чата, отличного от текущего пользователя
              const otherParticipant = Object.entries(chat.participants).find(
                ([id]) => id !== currentUserId
              );
              displayName = otherParticipant
                ? otherParticipant[1]
                : "Unknown User";
            }

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
