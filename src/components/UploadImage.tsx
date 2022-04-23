import { CloudUploadOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export default function UploadImage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //TODO implement
    //console.log(state);
    console.log(event);
    return;
  };

  interface State {
    currentFile: File | null;
    progress: number;
    isError: boolean;
    message: string;
    imageInfos: never[];
  }

  const [state, setState] = useState<State>({
    currentFile: null,
    progress: 0,
    message: "",
    isError: false,
    imageInfos: [],
  });

  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    if (!state.currentFile) return;
    setPreviewImage(URL.createObjectURL(state.currentFile));
  }, [state]);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((previous) => ({
      ...previous,
      currentFile: event.target.files ? event.target.files[0] : null,
    }));
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
            <Box>
              <img src={previewImage} width="100%" />
            </Box>
          </Grid>
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
