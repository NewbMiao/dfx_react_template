import React from "react";
import { dfx_react_template_backend } from "../../declarations/dfx_react_template_backend";
import { Box, Button, Input, Typography } from "@mui/material";

const MyHello = () => {
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  async function doGreet() {
    const greeting = await dfx_react_template_backend.greet(name);
    setMessage(greeting);
  }

  return (
    // make content of box centered
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <Input
          id="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        ></Input>
        <Button onClick={doGreet}>Get Greeting!</Button>
      </Box>
      <Typography>
        Greeting is: "<span style={{ color: "blue" }}>{message}</span>"
      </Typography>
    </Box>
  );
};

export default MyHello;
