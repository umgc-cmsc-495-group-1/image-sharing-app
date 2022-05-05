import { UserInterface } from "../types/authentication";
import {getUserByUserId} from "../data/userData";
import {ProfileInterface} from "../types/appTypes";
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
import { data } from "@tensorflow/tfjs";
import { firestore } from "../firebaseSetup";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  getDocsFromServer,
} from "firebase/firestore";
import "firebase/storage";
import { query, where } from "firebase/firestore";

const bodyStyle: React.CSSProperties = {
	fontFamily: 'Roboto',
	fontSize: 8
}

export default function updateProfile(GetUserByUserId: {User: AppUserInterface}) { //= async (event: React.MouseEvent<HTMLButtonElement>) => {
  const [bio, setBio] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  const updateProfile = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const userRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(userRef);
    const data = docSnap.data();
    event.preventDefault();
    const user: AppUserInterface = {
        displayName: updatedDisplayName,
        bio: updatedBio,
        uid: data.uid,
        username: data.username,
        first: data.first,
        last: data.last,
        email: data.email,
        likes: data.likes,
        friends: data.friends,
        interests: data.interests,
    };
      return user;
    };
  } 
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
