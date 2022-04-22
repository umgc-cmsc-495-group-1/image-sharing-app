import { CloudUploadOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

export default function UploadImage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //TODO implement
    //console.log(state);
    console.log(event);
    return;
  };

  interface State {
    currentFile: File | null;
    previewImage: string | null;
    progress: number;
    isError: boolean;
    message: string;
    imageInfos: never[];
  }

  const [state, setState] = useState<State>({
    currentFile: null,
    previewImage: null,
    progress: 0,
    message: "",
    isError: false,
    imageInfos: [],
  });

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((previous) => ({
      ...previous,
      currentFile: event.target.files ? event.target.files[0] : null,
    }));
    console.log(state);
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
        <Typography>Upload Image</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          role="upload-image"
        ></Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" component="label">
              Select Image
              <input type="file" hidden onChange={selectFile} />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
