import React, {useContext, useState} from "react";
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
import SuccessDisplay from "./SuccessDisplay";
import ErrorsDisplay from "./ErrorsDisplay";
import { Link } from "react-router-dom";
import { updateBio, updateDisplayName } from "../data/userData"
import {updateProfilePicture} from "../data/photoData";
import {AuthContext} from "../context/AuthContext";
import {sanitizeDisplayName} from "../utils/middleware";
import {ImageCompressionWorkerInterface} from "../types/appTypes";
import imageCompression from "browser-image-compression";

const HootUserSettings: React.FC = () => {
  const [updatedDisplayName, setUpdatedDisplayName] = React.useState<string>("");
  const [updatedBio, setUpdatedBio] = React.useState<string>("");
  const [fileToUpload, setFileToUpload] = useState<File | undefined>(undefined);
  const [success, setSuccess] = useState<string[]>([]);
  const [webWorkerData, setWebWorkerData] = useState<ImageCompressionWorkerInterface>({
    progress: 0,
    inputSize: "",
    outputSize: "",
    inputUrl: "",
    outputUrl: "",
  });
  const [errors, setErrors] = React.useState<string[]>([]);
  const { user } = useContext(AuthContext);
  // const ILLEGAL_CHARACTERS_REGEX = /\W/gi;

  /***************** COMPRESSION **********************************/

  const handleOnProgress = (progress: number, useWebWorker: boolean) => {
    if (useWebWorker) {
      setWebWorkerData({
        ...webWorkerData,
        progress,
      });
    }
  };

  const handleCompressImage = async (file: File, fileType: string) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
      onProgress: (p: number) => handleOnProgress(p, true),
      fileType: fileType
    };
    setWebWorkerData({
      ...webWorkerData,
      inputSize: (file.size / 1024 / 1024).toFixed(2),
      inputUrl: URL.createObjectURL(file),
    })
    const result = await imageCompression(file, options);
    setWebWorkerData({
      ...webWorkerData,
      outputSize: (file.size / 1024 / 1024).toFixed(2),
      outputUrl: URL.createObjectURL(file),
    });
    return result;
  };

  /***************** CHANGE **********************************/

  const uploadProfileImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files !== null && files.length > 0) {
      await handleCompressImage(files[0], files[0].type).then(result => {
        const file = new File([result], result.name, { type: result.type });
        setFileToUpload(file);
      });
    } else {
      setFileToUpload(undefined);
    }
  };

  // const sanitizeDisplayName = (displayName: string) => {
  //   return displayName.replace(ILLEGAL_CHARACTERS_REGEX, "");
  // };

  /***************** SUBMIT *****************/

  const handleUpdateProfilePicture = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (fileToUpload === undefined) {
      setErrors(["No file selected"]);
      return;
    }
    await updateProfilePicture(user, fileToUpload);
    setFileToUpload(undefined);
    setWebWorkerData({
      progress: 0,
      inputSize: "",
      outputSize: "",
      inputUrl: "",
      outputUrl: "",
    });
    setSuccess(["Profile picture updated"]);
    setTimeout(() => {
      setSuccess([]);
    }, 3000);
  }

  const handleDisplayNameSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await updateDisplayName(user, updatedDisplayName);
    setUpdatedDisplayName("");
    setSuccess(["Display name updated"]);
    setTimeout(() => {
      setSuccess([]);
    }, 3000);
  }

  const handleBioSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (updatedBio.length < 10 || updatedBio.length > 140) {
      setErrors(["Bio must be between 10 and 140 characters"]);
      return;
    }

    await updateBio(user, updatedBio);
    setUpdatedBio("");
    setSuccess(["Bio updated"]);
    setTimeout(() => {
      setSuccess([]);
    }, 3000);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <SuccessDisplay success={success} />
            <ErrorsDisplay errors={errors} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            <label htmlFor="profile-image">
              Please select a profile image
            </label>
          </Button>
          <TextField
            sx={{
              display: "none",
            }}
            required
            fullWidth
            id="profile-image"
            type="file"
            onChange={uploadProfileImage}
            inputProps={{
              accept: "image/*",
              id: "profile-image",
              placeholder: "Select Profile Image",
              style: { display: "none" },
            }}
          />
          <Button
            fullWidth
            color="primary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleUpdateProfilePicture}
          >Update Profile Picture</Button>
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
      </Grid>
    </Container>
  );
}

export default HootUserSettings;
