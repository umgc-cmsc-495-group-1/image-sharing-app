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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {signInGooglePopup} from "../data/authFunctions"; // , signup
import { UserInterface } from "../types/authentication";
import ErrorsDisplay from "./ErrorsDisplay";
// import { useNavigate } from "react-router-dom";
// import {UserSignupValidationError} from "../utils/Error";

export default function HootSignup() {
  const [createdUser, setCreatedUser] = useState<UserInterface>({
    displayName: "",
    username: "",
    photoURL: "",
    email: "",
    isVerified: false,
    password: "",
    verifyPassword: "",
  });
  const [profileImage, setProfileImage] = useState<string>("");
  const [fileToUpload, setFileToUpload] = useState<File | undefined>(undefined);
  const [errors, setErrors] = useState<string[]>([]);
  // const navigate = useNavigate();

  // TODO: write error handler

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

  const checkEmptyValues = () => {
    setErrors([]);
    if (
      createdUser.displayName === "" ||
      createdUser.username === "" ||
      createdUser.email === "" ||
      createdUser.password === "" ||
      createdUser.verifyPassword === ""
    ) {
      setErrors((errors) => [...errors, "All fields are required!"]);
      return true;
    }
    if (fileToUpload === undefined) {
      setErrors((errors) => [...errors, "Please upload a profile image!"]);
      return true;
    }

    return false;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: UserInterface = {
      displayName: createdUser.displayName,
      username: createdUser.username,
      photoURL: profileImage,
      email: createdUser.email,
      isVerified: false,
      password: createdUser.password,
      verifyPassword: createdUser.verifyPassword,
    };

    if (!checkEmptyValues()) {
      setErrors([]);
      console.log(fileToUpload)
      console.log(user)
      return;
    }


    // try {
    //   // sign up the user
    //   await signup(user)
    //     .then((res) => {
    //       if (res !== undefined) {
    //         if (res.status === 201) {
    //           console.log(res.user);
    //           return Promise.resolve(res)
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       if (err.status == 400) {
    //         throw new UserSignupValidationError(
    //           "UserSignupValidation",
    //           err.message
    //         );
    //       }
    //     });
    //
    // } catch (error) {
    //   console.log(error);
    // }



  };

  const handleGoogleSignin = async () => {
    await signInGooglePopup()
      .then(() => {
        // todo: redirect to feed
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // todo: need to create an image ref for the avatar, this will be used in photoURL state
  //  will implement similar logic from the createPost component.
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
                    displayName: event.target.value
                  });
                }}
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
                    username: event.target.value
                  });
                }}
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                role="username-input"
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Typography textAlign="center"> - or -</Typography>
          <Button
            fullWidth
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
