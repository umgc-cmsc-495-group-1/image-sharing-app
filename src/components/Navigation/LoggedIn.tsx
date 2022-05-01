import React from "react";
import { ListItem, ListItemText } from "@mui/material";
import { logout } from "../../data/authFunctions";
import { Link } from "react-router-dom";

const LoggedIn = ({ email }: { email: string | null }) => {
  return (
    <>
      <ListItem component={Link} to="/feed" role="navigation-feed">
        <ListItemText primary="Feed" />
      </ListItem>
      <ListItem component={Link} to="/explore" role="navigation-explore">
        <ListItemText primary="Explore" />
      </ListItem>
      <ListItem component={Link} to={`/user/${email}`} role="navigation-user-profile">
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem component={Link} to={`/user/${email}/friends`} role="navigation-user-friends">
        <ListItemText primary="Friends" />
      </ListItem>
      <ListItem component={Link} to={`/user/${email}/settings`} role="navigation-user-settings">
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem component={Link} to="/" role="navigation-logout"
        onClick={() => logout()}
      >
        <ListItemText primary="Sign Out" />
      </ListItem>
    </>
  );
};

export { LoggedIn };
