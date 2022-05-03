import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const NotLoggedIn = () => {
  return (
    <>
      <ListItem component={Link} to="/" role="navigation-feed">
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem component={Link} to="/login" role="navigation-login">
        <ListItemText primary="Login" />
      </ListItem>
      <ListItem component={Link} to="/signup" role="navigation-signup">
        <ListItemText primary="Sign Up" />
      </ListItem>
    </>
  )
}

export {
  NotLoggedIn
}
