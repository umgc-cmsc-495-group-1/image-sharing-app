import React from "react";
import FriendsList from "./FriendsList";
import { useFriends } from "../../hooks/useFriends";
import { Card, CardHeader, Container } from "@mui/material";

const Friends: React.FC = () => {
  const friends = useFriends();
  return (
    <Container maxWidth="sm">
      <Card raised sx={{ width: "100%" }}>
        <CardHeader title="Friends" />
        <FriendsList friends={friends} />
      </Card>
    </Container>
  );
};

export { Friends };
