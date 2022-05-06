import React from "react";
import { Box } from "@mui/material";
import { FeedPostType } from "../../types/appTypes";
import { UploadFab } from "../UploadFab";
import { useFeed } from "../../hooks/useFeed";
import Post  from "../Profile/Post";

const Feed: React.FC = (): JSX.Element => {
  const feed = useFeed();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
      role="feed-container"
    >
      <Box maxWidth="md">
        {feed.map((item: FeedPostType) => (
          <Post key={item.pid} pid={item.pid} />
        ))}
      </Box>
      <Box>
        <UploadFab />
      </Box>
    </Box>
  );
};

export default Feed;
