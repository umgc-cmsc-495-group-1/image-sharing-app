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
import { signInGooglePopup, signup } from "../data/authFunctions";
import { UserInterface } from "../types/authentication";
import { UserSignupValidationError } from "../utils/Error";
import { useNavigate } from "react-router-dom";

export default function HootSignup() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const navigate = useNavigate();

  // TODO: write error handler

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: UserInterface = {
      displayName: displayName,
      username: username,
      photoURL: "",
      email: email,
      password: password,
      verifyPassword: verifyPassword,
    };

    try {
      // sign up the user
      await signup(user)
        .then((res) => {
          if (res !== undefined) {
            if (res.status === 201) {
              console.log(res.user);
              return Promise.resolve(res)
            }
          }
        })
        .catch((err) => {
          if (err.status == 400) {
            throw new UserSignupValidationError(
              "UserSignupValidation",
              err.message
            );
          }
        });

    } catch (error) {
      console.log(error);
    }



  };

  const handleGoogleSignin = async () => {
    await signInGooglePopup()
      .then(() => {
        navigate("/auth-loading");
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
              <TextField
                onChange={(event) => {
                  setDisplayName(event.target.value);
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
                  setUsername(event.target.value);
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
                  setEmail(event.target.value);
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
                  setPassword(event.target.value);
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
                  setVerifyPassword(event.target.value);
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
