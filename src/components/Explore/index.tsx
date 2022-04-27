import React from 'react';
import {UploadFab} from "../UploadFab";
import {Box} from "@mui/material";
import {useCurrentUser} from "../../hooks/useCurrentUser";
import {useExplore} from "../../hooks/useExplore";
import {FeedPostType} from "../../types/appTypes";
import {FeedTile} from "../Feed/FeedTile";

const Explore = () => {
  const user = useCurrentUser();
  const explore = useExplore()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {explore.map((item: FeedPostType) => (
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
      <Box>
        <UploadFab />
      </Box>
    </Box>
  );
};

export {
  Explore,
};
