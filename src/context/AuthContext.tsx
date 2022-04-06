import React from "react";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

/*************************************************
 * React Context and Provider for Current User
 ************************************************/


type appUser = firebase.User | null;
type ContextState = { user: appUser };

const FirebaseAuthContext = React.createContext<ContextState | undefined>(undefined);
const FirebaseAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<appUser>(null);
  const value = { user };

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((setUser));
    return unsubscribe;
  }, []);
  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = React.useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context.user;
}

export { FirebaseAuthProvider, useFirebaseAuth };