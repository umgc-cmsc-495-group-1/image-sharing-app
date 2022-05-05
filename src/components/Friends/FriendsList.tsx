import React from "react";
import {
  Avatar,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AppUserInterface } from "../../types/authentication";
import FriendButton from "../FriendButton";

interface FriendsListInterface {
  friend: AppUserInterface;
  index: number;
  size: number;
}
// {friends.map((frd, index) => (
// ))}
const FriendsList: React.FC<FriendsListInterface> = ({ friend, index, size }) => {
  return (
    <List>
        <>
          <ListItem sx={{ width: "100%" }} key={friend.email}>
            <Link
              style={{ textDecoration: "none" }}
              href={"/user/" + friend.email}
            >
              <Avatar sx={{ bgcolor: "primary.main", marginRight: 1 }}>
                {friend.displayName.charAt(0)}
              </Avatar>
            </Link>
            <ListItemText primary={friend.displayName} />
            <FriendButton uid={friend.uid} />
          </ListItem>
          {index < size - 1 && <Divider />}
        </>
    </List>
  );
};

export default FriendsList;
