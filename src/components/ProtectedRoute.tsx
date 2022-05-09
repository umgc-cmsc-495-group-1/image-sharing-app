import React from "react";
import HootLogin from "./HootLogin";
import {AuthContext} from "../context/AuthContext";

interface Props {
  component: React.ComponentType;
  path?: string;
}

export const ProtectedRoute: React.FC<Props> = ({
  component: RouteComponent
}) => {
  const {user} = React.useContext(AuthContext);

  if (user) {
    return <RouteComponent />;
  }

  return <HootLogin />
};
