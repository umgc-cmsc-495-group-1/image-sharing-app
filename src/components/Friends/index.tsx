import React from "react";
import FriendsList from "./FriendsList";
import { useFriends } from "../../hooks/useFriends";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { Box } from "@mui/material";

const Friends: React.FC = () => {
  const user = useCurrentUser();
  const friends = useFriends();
  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      width: "50%",
    }}
    >
      <h2>Friends</h2>
      <FriendsList
        uid={user.uid}
        profilePicURL={""}
        friends={friends}
      />
    </Box>
  )
}

export {
  Friends
}