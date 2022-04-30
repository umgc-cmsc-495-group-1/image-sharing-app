import React from "react";
import {
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const HootUserSettings: React.FC = () => {
  return(
    <List>
      <ListItem button component={Link} to="/about/terms-of-service" role="terms-of-service">
        <ListItemText primary="Terms of Service" />
      </ListItem>
      <ListItem button component={Link} to="/about/privacy" role="privacy-policy">
        <ListItemText primary="Privacy Policy" />
      </ListItem>
    </List>
  );
}

export default HootUserSettings;
