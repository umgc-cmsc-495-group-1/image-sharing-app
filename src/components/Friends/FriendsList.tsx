import React, { useState } from 'react';
import { Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { AppUserInterface } from '../../types/authentication';
import { removeFriend } from '../../data/userData';

interface FriendsListInterface {
  uid: string;
  profilePicURL: string;
  friends: AppUserInterface[] | [];
}

const FriendsList: React.FC<FriendsListInterface> = (
  { uid, profilePicURL, friends }
) => {
  const [removeButtonText, setRemoveButtonText] = useState("Remove");
  const [confirmClicked, setConfirmClicked] = useState(false)

  const changeButtonText = (text: string) => {
    setRemoveButtonText(text)
    setConfirmClicked(true)
  }

  const confirmDelete = (friendUid: string) => {
    if (confirmClicked) {
      removeFriend(uid, friendUid)
    }
  }

  return (
    <List>
      {friends.map((frd) => (
        /* const user = getUserByUserId(uid).then(user => {
        return user
        }); */
        // TODO: set img to user's image
        <ListItem key={frd.uid}>
          <ListItemAvatar>
            src={profilePicURL}
          </ListItemAvatar>
          <ListItemText primary={frd.displayName} />
          <ListItemButton onClick={() => {
            changeButtonText("Are you sure?")
            confirmDelete(frd.uid)
          }}>
            {removeButtonText}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

export default FriendsList