import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LoadingBackdrop } from "../components/UploadFab/LoadingBackdrop";
import {Navigate} from "react-router-dom";

interface Props {
  component: React.ComponentType;
  // fallback?: React.ComponentType;
  path?: string;
}

export const ProtectedRoute: React.FC<Props> = ({
  component: RouteComponent
}) => {
  const {isLoading, user} = useContext(AuthContext);
  // if (!FallbackComponent) FallbackComponent = HootLogin;

  if (user) {
    if (isLoading) {
      return <LoadingBackdrop />;
    } else {
      return <RouteComponent />;
    }
  }

  return <Navigate to="/login" />;

};
