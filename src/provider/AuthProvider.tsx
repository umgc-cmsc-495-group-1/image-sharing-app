import { User } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseSetup";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setUser(null);
      }
    });
  }, [isLoading, user]);

  return <AuthContext.Provider value={{isLoading, user}}>{children}</AuthContext.Provider>;
};
