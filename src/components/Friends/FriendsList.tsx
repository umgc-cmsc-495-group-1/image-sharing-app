import userEvent from '@testing-library/user-event';
import React from 'react';
import { auth } from '../../firebaseSetup';
import { Box, Link, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { getUserByUserId } from '../../data/userData';

export default function FriendsList() {
  console.log('FriendsList happened')
  const user = auth.currentUser ? auth.currentUser.uid : 'no user'
  console.log(user)
  console.log(userEvent)
  const friendArray: string[] = []

  if (auth.currentUser != null) {
    getUserByUserId(auth.currentUser.uid).then(user => {
      const friends = user?.friends
      if (friends != undefined) {
        for (const frd of friends) {
          friendArray.push(frd)
        }
      }
    });
  }

  return (
    <Box>
      <h2>Friends</h2>
      <List>
        {friendArray.map((frd) => (
          /* const user = getUserByUserId(uid).then(user => {
          return user
          }); */
          // TODO: set img to user's image
          <ListItem key={frd}>
            <ListItemAvatar>
              src={"../assets/logo/png/simple-72x72.png"}
            </ListItemAvatar>
            <ListItemText primary={frd} />
            <ListItemButton>Remove</ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <Link href="/">
            <ListItemAvatar>
              <img src="../assets/logo/png/simple-72x72.png" />
            </ListItemAvatar>
          </Link>
          <ListItemText primary="Friend name" />
          <ListItemButton onClick={() => {
            console.log("Delete response: ", confirm("Are you sure?"));
          }}>Remove</ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
