import React, { useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//import { useNavigate } from 'react-router-dom';
import { newUser, signup } from '../data/authFunctons';

export default function HootSignup() {

  //const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: newUser = {
      first: firstName,
      last: lastName,
      username: username,
      email: email,
      password: password,
    }

    try {
      console.log(JSON.stringify(newUser));
      await signup(newUser);
    } catch (error) {
      console.log(error)
    }

    console.log({
      firstName,
      lastName,
      username,
      email,
      password,
      verifyPassword,
    });
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
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          role="signup-form"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                role="first-name-input"
                autoComplete="given-name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                role="last-name-input"
                autoComplete="family-name"
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
                role="username-input"
                autoComplete="username"
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
                role="email-input"
                autoComplete="email"
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
                role="password-input"
                autoComplete="new-password"
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
                role="verify-password-input"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            role="submit-button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" role="redirect-signup-to-login">
                Already have an account? Log in!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

