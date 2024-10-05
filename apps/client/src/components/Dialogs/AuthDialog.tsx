import React, { useEffect, useState } from "react";
import {
  Dialog,
  // DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tab,
  Tabs,
  Box,
  useTheme,
} from "@mui/material";

export const AuthDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  initialTab: number;
}> = ({ open, onClose, initialTab }) => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab);
      setUsername("");
      setPassword("");
      setUsernameError("");
      setPasswordError("");
    }
  }, [open, initialTab]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z]{3,}$/;
    if (!usernameRegex.test(username)) {
      setUsernameError(
        "Username must be at least 3 characters long and only contain Latin letters."
      );
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters, contain at least one uppercase letter and one number."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);

    if (isUsernameValid && isPasswordValid) {
      if (activeTab === 0) {
        // Handle login
        console.log("Login", { username, password });
        // Login functionality here
      } else {
        // Handle registration
        console.log("Register", { username, password });
        // Registration functionality here
      }
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {/* <DialogTitle>{activeTab === 0 ? "Login" : "Register"}</DialogTitle> */}
      <DialogContent>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!usernameError}
            helperText={usernameError}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
            margin="normal"
          />
          <DialogActions>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                color: `${theme.palette.secondary.contrastText}`,
                textTransform: "capitalize",
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              sx={{ width: "140px", textTransform: "capitalize" }}
            >
              {activeTab === 0 ? "Login" : "Register"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
