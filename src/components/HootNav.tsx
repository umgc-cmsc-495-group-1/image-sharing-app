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


export default function HootNav() {
  const [uid, setUid] = useState("");

  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    } else {
      setUid("");
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  function toggleDrawer(
    open: boolean,
    event: React.KeyboardEvent | React.MouseEvent
  ) {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key == "Tab" ||
        (event as React.KeyboardEvent).key == "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  }

  return (
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
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Toolbar></Toolbar>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={(event) => {
            toggleDrawer(false, event);
          }}
          onKeyDown={(event) => {
            toggleDrawer(false, event);
          }}
        >
          <List>
            <ListItem button component={Link} to="/" role="navigation-home">
              <ListItemText primary="Home" />
            </ListItem>
            {!uid ? ( // Logged out User Nav Section
              <>
                <ListItem button component={Link} to="/login" role="navigation-login">
                  <ListItemText primary="Login" />
                </ListItem>
                <ListItem button component={Link} to="/signup" role="navigation-signup">
                  <ListItemText primary="Sign Up" />
                </ListItem>
              </>
            ) : (
              ""
            )}
            {uid ? ( // Logged in User Nav Section
              <>
                <ListItem
                  button
                  onClick={() => {
                    logout();
                    navigate("../", { replace: true });
                  }}
                >
                  <ListItemText primary="Sign Out" />
                </ListItem>
              </>
            ) : (
              ""
            )}
          </List>
        </Box>
      </Drawer>
      <Outlet />
    </div>
  );
}