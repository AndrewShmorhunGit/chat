import React, { useEffect, useState } from "react";
import { getUser } from "../services/api";
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
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search"; // Import search icon

interface Country {
  countryCode: string;
  name: string;
}

export const LoginPage = () => {
  const [user, setUser] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    getUser().then(setUser);
  }, []);

  return (
    <Container>
      <TextField
        fullWidth
        label="Login"
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: "bold", color: theme.palette.primary.main }}
              >
                Users List
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
