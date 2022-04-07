import React, { useState } from "react";
import {
  Alert,
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
import { useNavigate } from "react-router-dom";
import { newUser, signInWithGoogle, signup } from "../data/authFunctons";

export default function HootSignup() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    displayName: "",
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [error, setError] = useState({
    displayName: "",
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [validForm, setValidForm] = useState(false);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "displayName":
        if (!value) {
          setError((prev) => ({
            ...prev,
            [name]: "Please enter a Display Name",
          }));
        } else {
          console.log("unsetting error");
          setError((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
        break;

      case "username":
        if (!value) {
          setError((prev) => ({
            ...prev,
            [name]: "Please enter a Username",
          }));
        } else {
          setError((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
        break;

      case "email":
        if (!value) {
          setError((prev) => ({
            ...prev,
            [name]: "Please enter an Email Address",
          }));
        } else {
          setError((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
        break;

      case "password":
        if (value.length < 6) {
          setError((prev) => ({
            ...prev,
            [name]: "Password must be at least 6 characters",
          }));
        } else if (input.verifyPassword && value !== input.verifyPassword) {
          setError((prev) => ({
            ...prev,
            [name]: "Passwords must match",
          }));
        } else {
          setError((prev) => ({
            ...prev,
            [name]: input.verifyPassword ? "" : error.verifyPassword,
          }));
        }
        break;

      case "verifyPassword":
        if (input.password && value !== input.password) {
          setError((prev) => ({
            ...prev,
            [name]: "Passwords must match",
          }));
        } else {
          setError((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
        break;

      default:
        break;
    }
    validateForm();
  };

  const validateForm = () => {
    setValidForm(
      input.displayName.length > 0 &&
        input.username.length > 0 &&
        input.email.length > 0 &&
        input.password.length > 0 &&
        input.verifyPassword.length > 0 &&
        error.displayName.length == 0 &&
        error.username.length == 0 &&
        error.email.length == 0 &&
        error.password.length == 0 &&
        error.verifyPassword.length == 0
    );
    console.log(validForm);
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: newUser = {
      displayName: input.displayName,
      username: input.username,
      email: input.email,
      password: input.password,
    };

    try {
      await signup(newUser);
    } catch (error) {
      console.log(error);
    }

    navigate("../", { replace: true });
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  onInputChange(event);
                }}
                onBlur={(event) => {
                  validateInput(event);
                }}
                required
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                autoComplete="name"
                autoFocus
              />
              {error.displayName && (
                <Alert severity="error">{error.displayName}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  onInputChange(event);
                }}
                onBlur={(event) => {
                  validateInput(event);
                }}
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
              />
              {error.username && (
                <Alert severity="error">{error.username}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  onInputChange(event);
                }}
                onBlur={(event) => {
                  validateInput(event);
                }}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              {error.email && <Alert severity="error">{error.email}</Alert>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  onInputChange(event);
                }}
                onBlur={(event) => {
                  validateInput(event);
                }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              {error.password && (
                <Alert severity="error">{error.password}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  onInputChange(event);
                }}
                onBlur={(event) => {
                  validateInput(event);
                }}
                required
                fullWidth
                name="verifyPassword"
                label="Verify Password"
                type="password"
                id="verifyPassword"
                autoComplete="new-password"
              />
              {error.verifyPassword && (
                <Alert severity="error">{error.verifyPassword}</Alert>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={!validForm}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={signInWithGoogle}
          >
            Google Sign In
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
