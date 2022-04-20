import { User } from "firebase/auth";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FirebaseAuthContext } from "../context/AuthContext";

export default function HomeRoute({ children }: { children: JSX.Element }) {
  const user: User | null = useContext(FirebaseAuthContext);

  if (!user) {
    return <Navigate to="/home" replace />;
  }
  return children;
}
