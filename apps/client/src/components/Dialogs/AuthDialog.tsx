import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Tab,
  Tabs,
  Box,
  useTheme,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../../services/api";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const validateUsername = (usernameToValidate: string): boolean => {
    const usernameRegex = /^[a-zA-Z]{3,}$/;
    if (!usernameRegex.test(usernameToValidate)) {
      setUsernameError(
        "Username must be at least 3 characters long and only contain Latin letters."
      );
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validatePassword = (passwordToValidate: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(passwordToValidate)) {
      setPasswordError(
        "Password must be at least 8 characters, contain at least one uppercase letter and one number."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePassword(password);

    if (isUsernameValid && isPasswordValid) {
      setLoading(true);
      try {
        const response =
          activeTab === 0
            ? await loginUser({ username, password })
            : await registerUser({ username, password });

        toast.success("Success!");
        localStorage.setItem("token", response.token);
        navigate(`/user/${response.userId}`);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        toast.error(`Error: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
            <LoadingButton
              variant="contained"
              type="submit"
              color="primary"
              loading={loading}
              sx={{ width: "140px", textTransform: "capitalize" }}
            >
              {activeTab === 0 ? "Login" : "Register"}
            </LoadingButton>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
