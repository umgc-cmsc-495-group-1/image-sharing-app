import React from "react";
import { User } from "firebase/auth";

export type AuthProviderProps = {
  user: User | null;
  isLoading: boolean | true;
}

export const AuthContext = React.createContext<AuthProviderProps>({
  user: null,
  isLoading: true
});
