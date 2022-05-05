import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Container,
  Grid,
  TextField,
  Box,
  Button
} from "@mui/material";
import ErrorsDisplay from "./ErrorsDisplay";
import { Link } from "react-router-dom";
import { updateBio, updateDisplayName } from "../data/userData"
import { useCurrentUser } from "../hooks/useCurrentUser";

const HootUserSettings: React.FC = () => {
  const [updatedDisplayName, setUpdatedDisplayName] = React.useState<string>("");
  const [updatedBio, setUpdatedBio] = React.useState<string>("");
  const [errors, setErrors] = React.useState<string[]>([]);
  const user = useCurrentUser();
  const ILLEGAL_CHARACTERS_REGEX = /\W/gi;

  const sanitizeDisplayName = (displayName: string) => {
    return displayName.replace(ILLEGAL_CHARACTERS_REGEX, "");
  };

  const handleDisplayNameSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await updateDisplayName(user.uid, updatedDisplayName);
    setUpdatedDisplayName("");
  }

  const handleBioSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (updatedBio.length < 10 || updatedBio.length > 140) {
      setErrors(["Bio must be between 10 and 140 characters"]);
      return;
    }

    await updateBio(user.uid, updatedBio);
    setUpdatedBio("");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <ErrorsDisplay errors={errors} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <List>
            <ListItemButton component={Link} to="/terms-of-service" role="terms-of-service">
              <ListItemText primary="Terms of Service" />
            </ListItemButton>
            <ListItemButton component={Link} to="/privacy" role="privacy-policy">
              <ListItemText primary="Privacy Policy" />
            </ListItemButton>
          </List>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(event) => setUpdatedDisplayName(sanitizeDisplayName(event.target.value))}
            value={updatedDisplayName}
            fullWidth
            name="NewDisplayName"
            label="Enter New Display Name"
            id="UpdatedDisplayName"
            autoComplete="display-name"
          />
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleDisplayNameSubmit}
          >Update Display Name</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(event) => setUpdatedBio(event.target.value)}
            value={updatedBio}
            fullWidth
            name="NewUserBio"
            label="Enter Updated Bio"
            id="UpdatedBio"
            autoComplete="bio"
          />
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleBioSubmit}
          >Update Bio</Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HootUserSettings;

  );
};
