
import {getUserByUserId} from "../data/userData";
import React, { useState } from "react";
import { User } from '@firebase/auth';
import {
  List,
  ListItem,
  TextField,
  Button,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AppUserInterface } from "../types/authentication";

const bodyStyle: React.CSSProperties = {
	fontFamily: 'Roboto',
	fontSize: 8
}

export default function updateProfile(getUserByUserId: {user:AppUserInterface}) { //= async (event: React.MouseEvent<HTMLButtonElement>) => {
  const [bio, setBio] = useState('');
  const [displayName, setDisplayName] = useState('');
  const updateProfile = () => {
    bio: "updatedBio";
    displayName: "updatedDisplayName";
  }
  
};

const HootUserSettings: React.FC = () => {
  return(
    <>
    <List>
      <ListItem button component={Link} to="/about/terms-of-service" role="terms-of-service">
      <ListItemText primary="Terms of Service" />
      <ListItemText style={bodyStyle} primary="Terms of Service" />
      </ListItem>
      <ListItem button component={Link} to="/about/privacy" role="privacy-policy">
      <ListItemText primary="Privacy Policy" />
      <ListItemText style={bodyStyle} primary="Privacy Policy" />
      </ListItem>
      <TextField
	fullWidth
	name="NewDisplayName"
	label="Enter New Display Name"
	id="UpdatedDisplayName"
      />
      <TextField 
	  fullWidth
	  name="NewUserBio"
	  label="Enter Updated Bio"
	  id="UpdatedBio"
	/>
     
       <Button style={bodyStyle} color="primary" variant="contained" onClick={() => updateProfile}>
	  Update User Settings
       </Button>
       </List>
       </>

  );
};