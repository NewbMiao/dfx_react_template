import { Container, Box, Typography } from "@mui/material";
import MyHello from "./Greet";
import React from "react";

export default function App() {
  return (
    <Container
      maxWidth="sm"
    >
      <Box sx={{ my: 4 }}>
        <MyHello />
      </Box>
    </Container>
  );
}
