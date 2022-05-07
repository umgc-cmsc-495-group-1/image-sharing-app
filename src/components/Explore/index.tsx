import React from "react";
import { UploadFab } from "../UploadFab";
import { Box, Container } from "@mui/material";
import { useExplore } from "../../hooks/useExplore";
import { FeedPostType } from "../../types/appTypes";
import Post from "../Profile/Post";

const Explore = () => {
  const explore = useExplore();
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
        role="explore-container"
      >
        <Box maxWidth="sm">
          {explore.map((item: FeedPostType) => (
            <Post key={item.pid} pid={item.pid} />
          ))}
        </Box>
        <Box>
          <UploadFab />
        </Box>
      </Box>
    </Container>
  );
};

export { Explore };
