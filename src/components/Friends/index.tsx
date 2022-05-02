import React from "react";
import FriendsList from "./FriendsList";
import { useFriends } from "../../hooks/useFriends";
import { Box } from "@mui/material";

const Friends: React.FC = () => {
  const friends = useFriends();
  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    }}
    >
      <h2>Friends</h2>
      <FriendsList
        friends={friends}
      />
    </Box>
  )
}

export {
  Friends
}