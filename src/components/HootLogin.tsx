import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { login, signInGooglePopup } from "../data/authFunctions";
import ErrorsDisplay from "./ErrorsDisplay";

export default function HootLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleErrors = () => {
    if (email === "" || password === "") {
      setErrors(["Email and password are required"]);
      return false;
    }
    setErrors([]);
    return true;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!handleErrors()) return;

    await login(email, password)
      .then(() => {
        setErrors([]);
        setEmail("");
        setPassword("");
        navigate("/feed");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          setErrors(["User not found"]);
        } else if (err.code === "auth/wrong-password") {
          setErrors(["Wrong password"]);
        } else {
          setErrors([err.message]);
        }
        console.error(err);
      });
  };

  const handleGoogleSignin = async () => {
    await signInGooglePopup()
      .then(() => {
        setErrors([]);
        navigate("/explore");
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [err.code]: err.message,
        });
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
        role="login-page-container"
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>Login</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
          role="login-form"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box>
                <ErrorsDisplay errors={errors} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
                required
                fullWidth
                id="email"
                aria-label="email-address"
                role="email-login"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
                required
                fullWidth
                name="password"
                aria-label="password"
                role="password-login"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            aria-label="login-email"
            name="login-email-password-submit"
            id="login-email-password-submit"
            role="login-email-password-submit"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Typography textAlign="center">- or -</Typography>
          <Button
            fullWidth
            variant="contained"
            aria-label="login-google"
            role="login-google-submit"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleGoogleSignin}
          >
            Sign In With Google
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                Don&apos;t have an account? Sign up!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
