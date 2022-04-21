import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import HootLogin from "./HootLogin";

interface Props {
  component: React.ComponentType;
  fallback?: React.ComponentType;
  path?: string;
}

export const ProtectedRoute: React.FC<Props> = ({
  component: RouteCompoonent,
  fallback: FallbackComponent,
}) => {
  const authValue = useContext(AuthContext);

  if (!FallbackComponent) FallbackComponent = HootLogin;

  if (authValue) return <RouteCompoonent />;

  return <FallbackComponent />;
};
