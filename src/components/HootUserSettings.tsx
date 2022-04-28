import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebaseSetup";
import { logout } from "../data/authFunctions";
import { onAuthStateChanged } from "firebase/auth";

function HootUser() {
  const { userId } = useParams();
  return <Typography>This is user {userId} settings</Typography>;

}

export default HootUser;
return(
  <div className="class.navigation">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              role='menu-icon'
              onClick={(event) => {
                toggleDrawer(!isOpen, event);
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              sx={{
                height: 64,
              }}
              alt="Hoot Logo"
              src={require("../assets/logo/png/simple-72x72.png")}
            />
            <Typography variant="h6">
              {uid ? uid + " - Hoot!" : "Hoot!"}
            </Typography>
	<List>
            <ListItem button component={Link} to="/" role="terms-of-service">
              <ListItemText primary="Terms of Service" />
                <ListItem button component={Link} to="/login" role="privacy-policy">
                  <ListItemText primary="Privacy Policy" />
                </ListItem>
               
              </>
);