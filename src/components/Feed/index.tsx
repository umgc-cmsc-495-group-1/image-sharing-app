import React from "react";
import { Box } from "@mui/material";
import { FeedTile } from "./FeedTile";
import { FeedPostType } from "../../types/appTypes";
import { UploadFab } from "../UploadFab";
import { useFeed } from "../../hooks/useFeed";
import { useCurrentUser } from "../../hooks/useCurrentUser";
// import { totalFeedPosts } from "../../tests/test_data"

const Feed: React.FC = (): JSX.Element => {
  const user = useCurrentUser();
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
      <Box maxWidth="md">
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
            isPrivate={item.isPrivate}
            likes={item.likes}
            user={user}
          />
        ))}
      </Box>
      <Box>
        <UploadFab />
      </Box>
    </Box>
  );
};

export default Feed;
