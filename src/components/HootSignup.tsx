import React, { useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { signup, newUser } from '../data/authFunctions'


export default function HootSignup() {

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setusername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    /**
     *
     *  onSubmit={async (e: React.SyntheticEvent) => {
              e.preventDefault();
              const user = e.target as typeof e.target & {
                first: { value: string }
                last: { value: string }
                username: { value: string }
                email: { value: string }
                password: { value: string }
              };

              const first = user.first.value
              const last = user.last.value
              const username = user.username.value
              const email = user.email.value // typechecks!
              const password = user.password.value // typechecks!
              const newUser = {
                first: first[0].toUpperCase() + first.substring(1),
                last: last[0].toUpperCase() + last.substring(1),
                username: username,
                email: email,
                password: password
              }
              // etc...
              try {
                await signup(newUser);

              } catch (error) {
                console.log(JSON.stringify(newUser));
                console.log(error);
                alert(`signup failed: ${error}`);
              } finally {
                alert('signed up')

              }
            }}
     */

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        console.log({
            firstName,
            lastName,
            username,
            email,
            password,
            verifyPassword,
        });
        const user: newUser = {
            first: firstName,
            last: lastName,
            username: username,
            email: email,
            password: password,
        }
        try {
            await signup(user);

          } catch (error) {
            console.log(JSON.stringify(user));
            console.log(error);
            alert(`signup failed: ${error}`);
          } finally {
            alert('signed up')

          }
        navigate("../", { replace: true });
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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange = {(event) => {
                                    setFirstName(event.target.value);
                                }}
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="given-name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange = {(event) => {
                                    setLastName(event.target.value);
                                }}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange = {(event) => {
                                    setusername(event.target.value);
                                }}
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange = {(event) => {
                                    setEmail(event.target.value);
                                }}
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange = {(event) => {
                                    setPassword(event.target.value);
                                }}
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange = {(event) => {
                                    setVerifyPassword(event.target.value);
                                }}
                                required
                                fullWidth
                                name="verifyPassword"
                                label="Verify Password"
                                type="password"
                                id="verifyPassword"
                                autoComplete="new-password"
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

