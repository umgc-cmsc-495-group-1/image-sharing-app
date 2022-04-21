import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FirebaseAuthContext } from "../context/AuthContext";

export default function HomeRoute({ children }: { children: JSX.Element }) {
  const authValue = useContext(FirebaseAuthContext);

  if (authValue?.userDataPresent) {
    if (authValue.user) {
      return <Navigate to="/home" replace />;
    }
  }
  return children;
}
