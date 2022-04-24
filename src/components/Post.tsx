import { CloudUploadOutlined } from "@mui/icons-material";
import ImageIcon from "@mui/icons-material/Image";
import LockIcon from "@mui/icons-material/Lock";
import {
  Paper,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createNewPost } from "../data/photoData";

export default function Post() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //TODO implement
    if (!user) return;
    if (!state.currentFile) return;
    event.preventDefault();
    await createNewPost(user.uid, state.caption, state.currentFile).then(() => {
      console.log("Success");
      navigate("/feed");
    });
    return;
  };

  interface State {
    currentFile: File | null;
    caption: string;
  }

  const [state, setState] = useState<State>({
    currentFile: null,
    caption: "",
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
    <Container component={Paper} maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          padding: 4,
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
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <img src={previewImage} width="100%" />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                component="label"
                color="primary"
              >
                <ImageIcon />
                <input type="file" hidden onChange={selectFile} />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                disabled={!previewImage}
                variant="contained"
                color="primary"
              >
                <LockIcon />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  setState((previous) => ({
                    ...previous,
                    caption: event.target.value,
                  }));
                }}
                multiline={true}
                disabled={!previewImage}
                fullWidth
                name="caption"
                label="Caption"
                id="caption"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                disabled={!previewImage}
                variant="contained"
              >
                Post
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
