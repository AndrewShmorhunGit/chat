import React, { useEffect, useState } from "react";
import { getUsers } from "../services/api";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  Avatar,
  useTheme,
  Button,
  Box,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { Loader } from "@components/Loader";
import { AuthDialog } from "@components/Dialogs/AuthDialog";
import SearchIcon from "@mui/icons-material/Search";
import { User } from "@utils/types";
import { FlexBox } from "@styles/StyledComponents/FlexBoxes";

export const LoginPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [initialTab, setInitialTab] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await getUsers();
      setUsers(response);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openLoginDialog = () => {
    setInitialTab(0); // Set to login tab
    setDialogOpen(true);
  };

  const openRegisterDialog = () => {
    setInitialTab(1); // Set to register tab
    setDialogOpen(true);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          mb: 2,
          mt: 2,
        }}
      >
        <FlexBox>
          <Button
            variant="contained"
            onClick={openLoginDialog}
            sx={{ textTransform: "capitalize" }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={openRegisterDialog}
            sx={{ ml: 2, textTransform: "capitalize" }}
          >
            Register
          </Button>
        </FlexBox>
        <TextField
          fullWidth
          label="Search Users"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          margin="normal"
          sx={{ margin: "2rem 0" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                  width: 180,
                }}
              >
                Avatar
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
              >
                User
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                  width: 180,
                }}
              >
                Password
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <Loader /> {/* Show loader in the table */}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell
                    sx={{
                      width: 40,
                    }}
                  >
                    <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AuthDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        initialTab={initialTab}
      />
    </Container>
  );
};
