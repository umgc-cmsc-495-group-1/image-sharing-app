import React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import HootHero from "./HootHero";

export default function HomePage() {
  return (
    <Container maxWidth="xl">
      <Grid container component="main" sx={{ height: "100vh" }}>
        <HootHero />
        <Grid item xs={12}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Let your imagination run wild!</Typography>
            <Button href="/signup" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
