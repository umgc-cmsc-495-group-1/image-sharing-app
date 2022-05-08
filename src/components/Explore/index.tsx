import React from "react";
import { Box, Container } from "@mui/material";
import { UploadFab } from "../UploadFab";
import Post from "../Profile/Post";
import { useExplore } from "../../hooks/useExplore";


const Explore: React.FC = (): JSX.Element => {
  const posts = useExplore();

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
        role="feed-container"
      >
        <Box maxWidth="sm">
          <div>
            {posts.map((item) => {
              return (
                <div key={item.pid}>
                  <Post pid={item.pid} />
                </div>
              )
            })}
          </div>
        </Box>
        <Box>
          <UploadFab />
        </Box>
      </Box>
    </Container>
  );
};

export default Explore;
