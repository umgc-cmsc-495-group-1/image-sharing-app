import { CloudUploadOutlined } from "@mui/icons-material";
import { Avatar, Box, Container, Typography } from "@mui/material";
import React from "react";

export default function UploadImage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //TODO implement
    console.log(event);
    return;
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <CloudUploadOutlined />
        </Avatar>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          role="upload-image"
        ></Box>
        <Typography>Upload Image</Typography>
      </Box>
    </Container>
  );
}
