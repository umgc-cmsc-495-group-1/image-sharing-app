import { User } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import React, { useEffect, useState } from "react";
import { auth } from "../firebaseSetup";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null)
      }
    });
  }, [user]);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
  //     setUser(firebaseUser);
  //   });

  //   return unsubscribe;
  // }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
