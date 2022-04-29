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
	const HootUserSettings: React.FC = () => {
 		return(
   			<List>
      				<ListItem button component={Link} to="/" role="terms-of-service">
       		 		<ListItemText primary="Terms of Service" />
      				<ListItem button component={Link} to="/login" role="privacy-policy">
       		 		<ListItemText primary="Privacy Policy" />
      				</ListItem>
    			</List>
  )
}
);