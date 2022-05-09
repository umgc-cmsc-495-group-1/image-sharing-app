import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  AppBar,
  IconButton,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { LoggedIn } from "./LoggedIn";
import { NotLoggedIn } from "./NotLoggedIn";
import { AuthContext } from "../../context/AuthContext";
import { encodeEmailAddress } from "../../utils/middleware";

const Navigation: React.FC = () => {
  const { appUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [encodedEmail, setEncodedEmail] = useState("");
  useEffect(() => {
    (async () => {
      if (appUser) {
        const currentEmail = encodeEmailAddress(appUser);
        setEncodedEmail(currentEmail);
      }
    })();
  }, [appUser]);

  return (
    <div className="class.navigation">
      <Box sx={{ flexGrow: 1, marginBottom: 5 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              role="menu-icon"
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
              {appUser ? appUser.displayName + " - Hoot!" : "Hoot!"}
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
            {appUser ? <LoggedIn email={encodedEmail} /> : <NotLoggedIn />}
          </List>
        </Box>
      </Drawer>
      <Outlet />
    </div>
  );
};

export { Navigation };
