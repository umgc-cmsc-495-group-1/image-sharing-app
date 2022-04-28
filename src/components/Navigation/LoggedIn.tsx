import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { logout } from "../../data/authFunctions";
import { Link } from "react-router-dom";

const LoggedIn = ({ email }: { email: string | null }) => {
  return (
    <>
      <ListItem button component={Link} to="/feed" role="navigation-feed">
        <ListItemText primary="Feed" />
      </ListItem>
      <ListItem button component={Link} to="/explore" role="navigation-explore">
        <ListItemText primary="Explore" />
      </ListItem>
      <ListItem button component={Link} to={`/user/${email}`} role="navigation-user-profile">
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button component={Link} to={`/user/${email}/friends`} role="navigation-user-friends">
        <ListItemText primary="Friends" />
      </ListItem>
      <ListItem button component={Link} to={`/user/${email}/settings`} role="navigation-user-settings">
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
  );
};

export { LoggedIn };
