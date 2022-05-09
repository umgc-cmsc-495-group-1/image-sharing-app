import React, { createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../firebaseSetup";
import { AppUserInterface } from "../types/authentication";
import { getLiveUser } from "../data/userData";

export type AuthProviderProps = {
  user: User | null;
  appUser: AppUserInterface | null;
  // isLoading: boolean | true;
};

export const AuthContext = createContext<AuthProviderProps>({
  user: null,
  appUser: null,
  // isLoading: true
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUserInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // const AuthCheck =

  useEffect(() => {
    const getUsers = async (inUser: User) => {
      setUser(inUser);
      const unsubscribe = getLiveUser(inUser, setAppUser);
      return unsubscribe;
    };
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      let unsubscribe;
      if (firebaseUser) {
        unsubscribe = getUsers(firebaseUser);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        setUser(null);
        setAppUser(null);
      }
      return unsubscribe;
    });
    return () => {
      unsubscribe();
    };
  }, [isLoading, user]);

  return (
    <AuthContext.Provider value={{ user, appUser }}>
      {children}
    </AuthContext.Provider>
  );
};
