import React from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function HootUser() {
  const { userId } = useParams();
  return <Typography>This is user {userId} profile</Typography>;
}
