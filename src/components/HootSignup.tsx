import React, {useState} from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {signInGooglePopup, signup} from "../data/authFunctions"; // , signup
import { UserInterface } from "../types/authentication";
import ErrorsDisplay from "./ErrorsDisplay";
import {useNavigate} from "react-router-dom";
import {uploadProfileImg} from "../data/photoData";

export default function HootSignup() {
  const [createdUser, setCreatedUser] = useState<UserInterface>({
    displayName: "",
    photoURL: "",
    email: "",
    isVerified: false,
    password: "",
    verifyPassword: "",
  });
  const [profileImage, setProfileImage] = useState<string>("");
  const [fileToUpload, setFileToUpload] = useState<File | undefined>(undefined);
  const [errors, setErrors] = useState<string[]>([]);
  const [registerDisabled, setRegisterDisabled] = useState<boolean>(true);
  const EMAIL_REGEX = /^(([^<>()[\]\\.,;!!#$%&*:\s@"]+(\.[^<>()[\]\\.,;!#$%&*:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const ILLEGAL_CHARACTERS_REGEX = /\W/gi;
  const navigate = useNavigate();
  const FormControlLabelText: React.ReactNode = (
    <Typography variant="body2" color="textSecondary">
      By signing up, you agree to our{" "}
      <Link href="/terms-of-service" color="inherit">
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link href="/privacy" color="inherit">
        Privacy Policy
      </Link>
    </Typography>
  );

  const uploadProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files !== null && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setFileToUpload(files[0]);
      setProfileImage(url);
    } else {
      setFileToUpload(undefined);
      setProfileImage("");
    }
  };

  const sanitizeDisplayName = (displayName: string) => {
    return displayName.replace(ILLEGAL_CHARACTERS_REGEX, "");
  };

  const checkEmptyValues = () => {
    setErrors([]);
    if (
      createdUser.displayName === "" ||
      createdUser.email === "" ||
      createdUser.password === "" ||
      createdUser.verifyPassword === ""
    ) {
      setErrors((errors) => [...errors, "All fields are required!"]);
      return false;
    }
    if (createdUser.password !== createdUser.verifyPassword) {
      setErrors((errors) => [...errors, "Passwords do not match!"]);
      return false;
    }
    console.log(createdUser.displayName.length)
    console.log(createdUser.displayName)
    if (createdUser.displayName.length < 6 || createdUser.displayName.length > 20) {
      setErrors((errors) => [...errors, "Display name must be between 6 and 20 characters!"]);
      return false;
    }
    if (!EMAIL_REGEX.test(createdUser.email)) {
      setErrors((errors) => [...errors, "Email is not valid!"]);
      return false;
    }
    if (fileToUpload === undefined) {
      setErrors((errors) => [...errors, "Please upload a profile image!"]);
      return false;
    }

    return true;
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(event)
    event.preventDefault();
    const user: UserInterface = {
      displayName: createdUser.displayName,
      photoURL: profileImage,
      email: createdUser.email,
      isVerified: false,
      password: createdUser.password,
      verifyPassword: createdUser.verifyPassword,
    };
    // prevent form submission if there are errors
    if (!checkEmptyValues()) return;
    console.log(user)

    try {
      // sign up the user
      await signup(user)
        .then((res) => {
          if (res !== undefined){
            uploadProfileImg(res.user, fileToUpload);
            navigate("/explore");
          }
        })
        .catch((err) => {
          console.error([err.code] + `: ${err.message}`);
        });
    } catch (error) {
      console.error(error);
    }

  };

  const handleGoogleSignin = async () => {
    await signInGooglePopup()
      .then(() => {
        navigate("/explore");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>Sign Up</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          role="signup-form"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <ErrorsDisplay errors={errors} />
              </Box>
            </Grid>
            <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3, mb: 2
                }}
                >
                  <label htmlFor="profile-image">Please select a profile image</label>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  setCreatedUser({
                    ...createdUser,
                    displayName: sanitizeDisplayName(event.target.value)
                  });
                }}
                value={createdUser.displayName}
                required
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                autoComplete="display-name"
                role="display-name-input"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  setCreatedUser({
                    ...createdUser,
                    email: event.target.value
                  });
                }}
                value={createdUser.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                role="email-input"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  setCreatedUser({
                    ...createdUser,
                    password: event.target.value
                  });
                }}
                value={createdUser.password}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                role="password-input"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  setCreatedUser({
                    ...createdUser,
                    verifyPassword: event.target.value
                  });
                }}
                value={createdUser.verifyPassword}
                required
                fullWidth
                name="verifyPassword"
                label="Verify Password"
                type="password"
                id="verifyPassword"
                autoComplete="new-password"
                role="verify-password-input"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!registerDisabled}
                    onChange={(event) => {
                      setRegisterDisabled(!event.target.checked);
                    }}
                    inputProps={{"aria-label": "submit-checkbox-agreement"}}
                  />
                }
                label={FormControlLabelText}
                labelPlacement='end'
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={registerDisabled}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Typography textAlign="center"> - or -</Typography>
          <Button
            fullWidth
            disabled={registerDisabled}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleGoogleSignin}
          >
            Sign In with Google!
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
