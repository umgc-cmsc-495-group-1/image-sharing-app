import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import HootHero from "./HootHero";

const headerStyle: React.CSSProperties = {
	fontFamily: 'Merienda', cursive;
	fontSize: 8
}

export default function HootHome() {

  return (
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
          <Typography variant="h6">Let your imagination run wild!</Typography>
          <Button href="/signup" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
