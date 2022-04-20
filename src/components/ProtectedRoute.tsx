import { User } from "firebase/auth";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FirebaseAuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const user: User | null = useContext(FirebaseAuthContext);

  return user ? children : <Navigate to="/login" replace />;
}
