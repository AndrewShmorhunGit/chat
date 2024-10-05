import React from "react";
import { CircularProgress, Box } from "@mui/material";

export const Loader: React.FC = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    }}
  >
    <CircularProgress />
  </Box>
);
