import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const HootUserSettings: React.FC = () => {
  return(
    <List>
      <ListItemButton component={Link} to="/terms-of-service" role="terms-of-service">
        <ListItemText primary="Terms of Service" />
      </ListItemButton>
      <ListItemButton component={Link} to="/privacy" role="privacy-policy">
        <ListItemText primary="Privacy Policy" />
      </ListItemButton>
    </List>
  );
}

export default HootUserSettings;
