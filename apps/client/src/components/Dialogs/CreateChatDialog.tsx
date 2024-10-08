import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { UsersTable } from "./UsersTable";
import { createChat } from "../../services/api";
import { FlexBox } from "@styles/StyledComponents/FlexBoxes";
import { Chat } from "@utils/types";

export const ChatCreationDialog = ({
  open,
  onClose,
  currentUserId,
}: {
  open: boolean;
  onClose: (newChat: Chat | null) => void;
  currentUserId: string;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [chatType, setChatType] = useState<"private" | "group">("private");
  const [groupName, setGroupName] = useState("");

  const handleCreateChat = async () => {
    if (chatType === "private" && selectedUsers.length !== 1) {
      alert("Please select exactly 1 participant for a private chat.");
      return;
    }

    if (chatType === "group" && selectedUsers.length < 2) {
      alert("Please select at least 2 participants for a group chat.");
      return;
    }

    // Удаляем текущего пользователя из списка выбранных участников
    const participants =
      chatType === "private"
        ? [selectedUsers[0], currentUserId]
        : [...selectedUsers, currentUserId];

    try {
      const newChat = await createChat(
        chatType,
        participants,
        chatType === "group" ? groupName : undefined
      );
      onClose(newChat);
    } catch (error) {
      console.error("Chat creation error", error);
    }
  };

  const handleChatTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChatType = e.target.value as "private" | "group";
    setChatType(newChatType);

    if (newChatType === "private" && selectedUsers.length > 1) {
      setSelectedUsers(selectedUsers.slice(0, 1));
    }
  };

  const handleClose = () => {
    if (selectedUsers.length === 0 && groupName === "") {
      onClose(null);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Chat</DialogTitle>
      <DialogContent>
        <RadioGroup row value={chatType} onChange={handleChatTypeChange}>
          <FormControlLabel
            value="private"
            control={<Radio />}
            label="Private"
          />
          <FormControlLabel value="group" control={<Radio />} label="Group" />
        </RadioGroup>

        <UsersTable
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          chatType={chatType}
          currentUserId={currentUserId}
        />

        {chatType === "group" && (
          <TextField
            label="Group Name"
            variant="outlined"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            sx={{ mt: 2 }}
          />
        )}

        <FlexBox sx={{ mt: 2 }}>
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            onClick={handleCreateChat}
            disabled={
              chatType === "group"
                ? selectedUsers.length < 1 || !groupName
                : selectedUsers.length === 0
            }
          >
            Add Chat
          </Button>
        </FlexBox>
      </DialogContent>
    </Dialog>
  );
};
