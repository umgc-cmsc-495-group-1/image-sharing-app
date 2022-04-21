import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FirebaseAuthContext } from "../context/AuthContext";
import Spinner from "./Spinner";

interface Props {
  component: React.ComponentType;
  path?: string;
}

export const ProtectedRoute: React.FC<Props> = ({
  component: RouteCompoonent,
}) => {
  const authValue = useContext(FirebaseAuthContext);

  if (!authValue?.userDataPresent) return <Spinner />;
  if (authValue?.user) return <RouteCompoonent />;

  return <Navigate to="/signup" />;
};
