import React from 'react';
import { Avatar, Link, List, ListItem, ListItemText } from '@mui/material';
import { AppUserInterface } from '../../types/authentication';
import FriendButton from '../FriendButton';

interface FriendsListInterface {
  friends: AppUserInterface[] | [];
}

const FriendsList: React.FC<FriendsListInterface> = (
  { friends }
) => {

  const textStyle = {
    width: 'fit-content',
    padding: 40,
  }

  const friendListItemStyle = {
    border: '2px solid black',
    borderRadius: 5,
    margin: 10,
    height: 60,
  }

  return (
    <List>
      {friends.map((frd) => (
        <>
          <ListItem key={frd.displayName} style={friendListItemStyle}>
            <ListItem style={{ width: 'fit-content' }}>
              <Link style={{ textDecoration: 'none' }} href={"/user/" + frd.email}>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {frd.displayName.charAt(0)}
                </Avatar>
              </Link>
            </ListItem>
            <ListItemText style={textStyle} primary={frd.displayName} />
            <ListItem style={{ width: 'fit-content' }}>
              <FriendButton uid={frd.uid} />
            </ListItem>
          </ListItem>
        </>
      ))}
    </List>
  );
}

export default FriendsList