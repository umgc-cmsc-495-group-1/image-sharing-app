import React from "react";
import { auth } from "../firebaseSetup";
import { User } from "@firebase/auth";

/*************************************************
 * React Context and Provider for Current User
 ************************************************/

const FirebaseAuthContext = React.createContext<User | null>(null);

const FirebaseAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={user}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = React.useContext(FirebaseAuthContext);
  if (context === null) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context;
}

export { FirebaseAuthContext, FirebaseAuthProvider, useFirebaseAuth };
