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
  friends: AppUserInterface[] | [];
}

const FriendsList: React.FC<FriendsListInterface> = ({ friends }) => {
  return (
    <List>
      {friends.map((frd, index) => (
        <>
          <ListItem sx={{ width: "100%" }} key={frd.email}>
            <Link
              style={{ textDecoration: "none" }}
              href={"/user/" + frd.email}
            >
              <Avatar sx={{ bgcolor: "primary.main", marginRight: 1 }}>
                {frd.displayName.charAt(0)}
              </Avatar>
            </Link>
            <ListItemText primary={frd.displayName} />
            <FriendButton uid={frd.uid} />
          </ListItem>
          {console.log(index + "<" + friends.length)}
          {index < friends.length - 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default FriendsList;
