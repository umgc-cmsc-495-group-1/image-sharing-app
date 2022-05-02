import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import heroImage from "../assets/static/images/alex-rybin-Ne5nShVl6NM-unsplash.jpg";

const titleStyle: React.CSSProperties = {
	fontFamily: 'Merienda', cursive;
	fontSize: 12
}
 
export default function HootHero() {
  return (
    <Grid
      item
      xs={12}
      sx={{
        background: `url(${heroImage})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "black",
          opacity: "0.6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "space-between",
        }}
      >
        <Typography style={titleStyle} width="100%" variant="h4" color="white" align="center">
          Unlimited Possibilities
        </Typography>
        <Typography style={titleStyle} width="100%" variant="h4" color="white" align="center">
          Powered by Your Imagination
        </Typography>
      </Box>
    </Grid>
  );
}
