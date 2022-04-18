import React, { useContext } from "react";
import { User } from "firebase/auth";
import { FirebaseAuthContext } from "../context/AuthContext";
import { Typography } from "@mui/material";

export default function HootHome() {
  const user: User | null = useContext(FirebaseAuthContext);

  return (
    <>
      {!user ? (
        <Typography>No user logged in</Typography>
      ) : (
        <Typography>User logged in</Typography>
      )}
    </>
  );
}
