import React, { useRef } from "react";
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
import { newUser, signInWithGoogle, signup } from "../data/authFunctons";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function HootSignup() {
  const navigate = useNavigate();

  type FieldValues = {
    displayName: string;
    username: string;
    email: string;
    password: string;
    verifyPassword: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newUser: newUser = {
      displayName: data.displayName,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      await signup(newUser);
    } catch (error) {
      console.log(error);
    }

    navigate("../", { replace: true });
  };

  const password = useRef({});
  React.useEffect(() => {
    let unmounted = false;
    setTimeout(() => {
      if (!unmounted) {
        password.current = watch("password", "");
      }
    }, 3000);

    return () => {
      unmounted = true;
    };
  });

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
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("displayName", {
                  required: "Display Name Required",
                  minLength: {
                    value: 4,
                    message: "Display Names must be at least 4 characters",
                  },
                })}
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                autoComplete="name"
                autoFocus
              />
              {errors.displayName && (
                <Alert severity="error">{errors.displayName?.message}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("username", {
                  required: "Username Required",
                  minLength: {
                    value: 4,
                    message: "Username must be at least 4 characters",
                  },
                })}
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
              />
              {errors.username && (
                <Alert severity="error">{errors.username?.message}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("email", {
                  required: "Email address required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "This doesn't look like an email address...",
                  },
                })}
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              {errors.email && (
                <Alert severity="error">{errors.email?.message}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
              {errors.password && (
                <Alert severity="error">{errors.password?.message}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("verifyPassword", {
                  validate: (value) =>
                    value === password.current || "The passwords must match!",
                })}
                fullWidth
                name="verifyPassword"
                label="Verify Password"
                type="password"
                id="verifyPassword"
                autoComplete="new-password"
              />
              {errors.verifyPassword && (
                <Alert severity="error">{errors.verifyPassword?.message}</Alert>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            fullWidth
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
