import React, { useContext } from "react";
import { User } from "firebase/auth";
import { FirebaseAuthContext } from "../context/AuthContext";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import HootHero from "./HootHero";
import { useNavigate } from "react-router-dom";

export default function HootHome() {
  const navigate = useNavigate();
  const user: User | null = useContext(FirebaseAuthContext);

  return (
    <>
      {user ? (
        navigate("/feed")
      ) : (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <HootHero />
          <Grid item xs={12} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">
                Let your imagination run wild!
              </Typography>
              <Button href="/signup" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
