import React, { useCallback, useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import { FeedPostType } from "../../types/appTypes";
import { UploadFab } from "../UploadFab";
import Post from "../Profile/Post";
import { useFeed } from "../../hooks/useFeed";
import { FieldValue } from "firebase/firestore";

const Feed: React.FC = (): JSX.Element => {
  const [nextTimestamp, setNextTimestamp] = useState<FieldValue | undefined>(
    undefined
  );
  const { posts, loading, lastTimestamp } = useFeed(nextTimestamp);
  const observer = useRef<IntersectionObserver>();
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setNextTimestamp(lastTimestamp);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, lastTimestamp]
  );

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
          {posts.map((item: FeedPostType, index: number) => {
            if (posts.length == index + 1) {
              return (
                <div key={item.pid} ref={lastPostRef}>
                  <Post pid={item.pid} />
                </div>
              );
            } else {
              return (
                <div key={item.pid}>
                  <Post pid={item.pid} />
                </div>
              );
            }
          })}
        </Box>
        <Box>
          <UploadFab />
        </Box>
      </Box>
    </Container>
  );
};

export default Feed;
