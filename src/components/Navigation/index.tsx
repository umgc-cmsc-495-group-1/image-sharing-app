import React, { useState } from "react";
import {
  Box,
  AppBar,
  IconButton,
  Drawer,
  List,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { auth } from "../../firebaseSetup";
import { LoggedIn } from "./LoggedIn";
import { NotLoggedIn } from "./NotLoggedIn";


const Navigation: React.FC = () => {
  const [uid, setUid] = useState("");
  const [username, setUsername] = useState<string | null>("")
  const [isOpen, setIsOpen] = useState(false);

  auth.onAuthStateChanged(user => {
    if (user !== null) {
      setUid(user.uid)
      setUsername(user.displayName)
    }
  })

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
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Box
              component="img"
              sx={{
                height: 64,
              }}
              alt="Hoot Logo"
              src={require("../../assets/logo/png/simple-72x72.png")}
            />
            <Typography variant="h6">
              {username ? username + " - Hoot!" : "Hoot!"}
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
          onClick={() => setIsOpen(false)}
        >
          <List>
            {(auth.currentUser !== null) ?
              <LoggedIn
                uid={uid}
              />
              :
              <NotLoggedIn />
            }
          </List>
        </Box>
      </Drawer>
      <Outlet />
    </div>
  )
}

export {
  Navigation
}
