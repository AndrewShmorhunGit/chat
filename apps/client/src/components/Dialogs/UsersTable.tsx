import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  Typography,
  Box,
  Radio,
  TextField,
} from "@mui/material";
import { getUsers } from "../../services/api";
import { User } from "@utils/types";

interface UsersTableProps {
  selectedUsers: string[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>;
  chatType: "private" | "group";
  currentUserId: string; // Добавляем текущий ID пользователя
}

export const UsersTable: React.FC<UsersTableProps> = ({
  selectedUsers,
  setSelectedUsers,
  chatType,
  currentUserId,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const handleSelectUser = (userId: string) => {
    if (chatType === "private") {
      setSelectedUsers([userId]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.includes(userId)
          ? prevSelected.filter((id) => id !== userId)
          : [...prevSelected, userId]
      );
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
      user.userId !== currentUserId
  );

  return (
    <Box>
      <TextField
        variant="outlined"
        placeholder="Search Users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TableContainer sx={{ maxHeight: 400, width: "16rem" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Username</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.userId}>
                <TableCell padding="checkbox">
                  {chatType === "private" ? (
                    <Radio
                      checked={selectedUsers.includes(user.userId)}
                      onChange={() => handleSelectUser(user.userId)}
                    />
                  ) : (
                    <Checkbox
                      checked={selectedUsers.includes(user.userId)}
                      onChange={() => handleSelectUser(user.userId)}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                      {user.username[0].toUpperCase()}
                    </Avatar>
                    <Typography variant="body1">{user.username}</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
