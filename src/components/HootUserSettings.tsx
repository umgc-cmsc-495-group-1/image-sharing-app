import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Button,
  TextField,
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

const UpdateBio = async (event: React.MouseEvent<HTMLButtonElement>) => {
	return (

	<UserMetaData
		bio={profileData.UpdatedBio}
	/>
	

const HootUserSettings: React.FC = () => {
  return(
    <List>
      <ListItem button component={Link} to="/about/terms-of-service" role="terms-of-service">
        <ListItemText primary="Terms of Service" />
      </ListItem>
      <ListItem button component={Link} to="/about/privacy" role="privacy-policy">
        <ListItemText primary="Privacy Policy" />
      <Button color="primary" variant="contained" onClick={handleSubmit}>
	Update Bio
      </Button>
    </List>
  );
}
