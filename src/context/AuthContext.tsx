import React, {useEffect, useState} from "react";
import { User } from "firebase/auth";
import {auth} from "../firebaseSetup";

export type AuthProviderProps = {
  user: User | null;
  isLoading: boolean | true;
}

export const AuthContext = React.createContext<AuthProviderProps>({
  user: null,
  isLoading: true
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const AuthCheck = auth.onAuthStateChanged((firebaseUser) => {
    if (firebaseUser) {
      setUser(firebaseUser);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setUser(null);
    }
  });

  useEffect(() => {
    AuthCheck();
    return () => AuthCheck();
  }, [isLoading, user, AuthCheck]);

  return <AuthContext.Provider value={{isLoading, user}}>{children}</AuthContext.Provider>;
};
