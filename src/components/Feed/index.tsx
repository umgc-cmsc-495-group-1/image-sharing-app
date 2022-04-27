import React from "react";
import { Box } from "@mui/material";
import { FeedTile } from "./FeedTile";
import { FeedPostType } from "../../types/appTypes";
import { UploadFab } from "../UploadFab";
import { useFeed } from "../../hooks/useFeed";
// import { totalFeedPosts } from "../../tests/test_data"

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
    >
      {feed.map((item: FeedPostType) => (
        <FeedTile
          key={item.pid}
          path={item.path}
          imageUrl={item.imageUrl}
          uid={item.uid}
          username={item.username}
          pid={item.pid}
          postText={item.postText}
          classification={item.classification}
          timestamp={item.timestamp}
          comments={item.comments}
          likes={item.likes}
        />
      ))}
      <Box>
        <UploadFab />
      </Box>
    </Box>
  );
};

export default Feed;
