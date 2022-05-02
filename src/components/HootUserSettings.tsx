 import React from "react";
import {updateProfile} from "../data/userData";
import React, { useState } from "react";
import {
  List,
  ListItem,
import {
} from "@mui/material";
import { Link } from "react-router-dom";

const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
	return (
	
	<TextField 
	  fullWidth
	  name="NewUserBio"
	  label="Enter Updated Bio"
	  id="UpdatedBio"
	/>
	
	<Button color="primary" variant="contained" onClick={updateBio}>
	  Update Bio
	</Button>
);
const bodyStyle: React.CSSProperties = {
	fontFamily: 'Roboto',
	fontSize: 8
}


const updateBio = async (event: React.MouseEvent<HTMLButtonElement>) => {
	return (
	const { uid } = useParams();
	const profileData = getProfileData(uid);
	const Profile: UserMetaData= {
		bio: UpdatedBio,
		dispayName: UpdatedDisplayName,
	};
	
);
}

const HootUserSettings: React.FC = () => {
  return(
    <>
    <List>
      <ListItem button component={Link} to="/about/terms-of-service" role="terms-of-service">
        <ListItemText primary="Terms of Service" />
        <ListItemText style={{bodyStyle}} primary="Terms of Service" />
      </ListItem>
      <ListItem button component={Link} to="/about/privacy" role="privacy-policy">
        <ListItemText primary="Privacy Policy" />
      <Button color="primary" variant="contained" onClick={handleSubmit}>
	Update Bio
      </Button>
        <ListItemText style={{bodyStyle}} primary="Privacy Policy" />
      </ListItem>
      <TextField
	fullWidth
	style="bodyStyle"
	name="NewDisplayName"
	lable="Enter New Display Name"
	id="UpdatedDisplayName"
      />
      <TextField 
	  fullWidth
	  style="bodyStyle"
	  name="NewUserBio"
	  label="Enter Updated Bio"
	  id="UpdatedBio"
	/>
     
	<Button style={{bodyStyle}} color="primary" variant="contained" onClick={updateBio}>
	  Update User Settings
	</Button>
    </List>
    </>

  );
}

export default HootUserSettings;