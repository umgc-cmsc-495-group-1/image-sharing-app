import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import HootLogin from "./HootLogin";
import { LoadingBackdrop } from "../components/UploadFab/LoadingBackdrop";

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

  return <HootLogin />;

};
