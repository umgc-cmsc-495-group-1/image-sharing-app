import React, { useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import { useNavigate } from 'react-router-dom';
import { newUser, signup } from '../data/authFunctions';
import { UserSignupValidationError } from '../utils/Error';

export default function HootSignup() {

  //const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [err, setErr] = useState("");

  const handleError = async (event: React.FormEvent<HTMLFormElement>, user: newUser) => {
    event.preventDefault();
    // verify passwords
    if (user.password !== user.verifyPassword) {
      // make the error div visible
      const errDiv: HTMLDivElement | null = document.querySelector('.submit-error');
      if (errDiv !== null) {
        errDiv.style.visibility = 'visible';
      }
      // reset forms to blank and display error
      setDisplayName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setVerifyPassword("");
      throw new UserSignupValidationError(
        'UserSignupValidation',
        'Credentials are missing from sign up form'
      );
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: newUser = {
      displayName: displayName,
      username: username,
      email: email,
      password: password,
      verifyPassword: verifyPassword
    }

    try {
      // console.log(JSON.stringify(newUser));
      if (user.password !== user.verifyPassword) {
        handleError(event, user);
      }
      await signup(user);
    } catch (error) {
      if (error instanceof UserSignupValidationError) {
        setErr(error.message);
      }

    }

    console.log(user);
    //navigate("../", { replace: true });
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} role="signup-form">
          <Box
            sx={{
              visibility: 'hidden',
              className: 'submit-error',
              backgroundColor: '#F04848',
              color: '#fff',
            }}
          >
            <Typography
              sx={{
                visibility: 'inherit',
              }}
              id="on-error-message"
              variant="body2"
            >{err}</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
  )
}
