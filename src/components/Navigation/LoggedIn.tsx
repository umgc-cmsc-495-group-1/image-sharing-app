import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { logout } from '../../data/authFunctions';
import { Link } from 'react-router-dom';

const LoggedIn = ({ uid }: { uid: string | undefined }) => {
  return (
    <>
      <ListItem button component={Link} to="/feed" role="navigation-feed">
        <ListItemText primary="Feed" />
      </ListItem>
      <ListItem button component={Link} to={`/user/${uid}/profile`} role="navigation-user-profile">
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button component={Link} to={`/user/${uid}/settings`} role="navigation-user-settings">
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem button component={Link} to="/" role="navigation-logout"
        onClick={() => {
          logout();
        }}
      >
        <ListItemText primary="Sign Out" />
      </ListItem>
    </>
  )
}

export {
  LoggedIn
}
