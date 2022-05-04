import React from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { logout } from "../../data/authFunctions";
import { Link } from "react-router-dom";

const LoggedIn = ({ email }: { email: string }) => {
  return (
    <>
      <ListItemButton component={Link} to="/feed" role="navigation-feed">
        <ListItemText primary="Feed" />
      </ListItemButton>
      <ListItemButton component={Link} to="/explore" role="navigation-explore">
        <ListItemText primary="Explore" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={`/user/${email}`}
        role="navigation-user-profile"
      >
        <ListItemText primary="Profile" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={`/user/${email}/friends`}
        role="navigation-user-friends"
      >
        <ListItemText primary="Friends" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={`/user/${email}/settings`}
        role="navigation-user-settings"
      >
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton
        component={Link}
        to={"/"}
        role="navigation-logout"
        onClick={() => logout()}
      >
        <ListItemText primary="Sign Out" />
      </ListItemButton>
    </>
  );
};

export { LoggedIn };
