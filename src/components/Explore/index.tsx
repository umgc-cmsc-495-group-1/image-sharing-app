import React from "react";
import { UploadFab } from "../UploadFab";
import { Box } from "@mui/material";
import { useExplore } from "../../hooks/useExplore";
import { FeedPostType } from "../../types/appTypes";
import Post from "../Profile/Post";
// import {graph} from "../../engine/Engine";
// import {useCurrentUser} from "../../hooks/useCurrentUser";

const Explore = () => {
  // const user = useCurrentUser();
  const explore = useExplore();
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
        {explore.map((item: FeedPostType) => {
          return (
              <Post key={item.pid} pid={item.pid} />
          )
        })}
        {/*{explore.map((item: FeedPostType) => (*/}
        {/*  <Post key={item.pid} pid={item.pid} />*/}
        {/*))}*/}
      </Box>
      <Box>
        <UploadFab />
      </Box>
    </Box>
  );
};

export { Explore };
