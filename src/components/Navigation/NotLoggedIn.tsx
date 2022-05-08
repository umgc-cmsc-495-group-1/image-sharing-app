import React from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const NotLoggedIn = () => {
  return (
    <>
      <ListItemButton component={Link} to="/" role="navigation-feed">
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton component={Link} to="/login" role="navigation-login">
        <ListItemText primary="Login" />
      </ListItemButton>
      <ListItemButton component={Link} to="/signup" role="navigation-signup">
        <ListItemText primary="Sign Up" />
      </ListItemButton>
    </>
  );
};

export { NotLoggedIn };
