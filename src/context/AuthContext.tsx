import React, { useEffect, useState } from "react";
import { auth } from "../firebaseSetup";
// import Cookies from 'js-cookie';
// import {
//   UserInterface,
//   GoogleUserType,
//   ReturnUserInterface
// } from '../types/authentication';
// import { UserInterface } from '../types/authentication';
// , onAuthStateChanged, connectAuthEmulator
import { Unsubscribe, User } from "@firebase/auth";
// import { firebase } from '../firebaseSetup';
// import firebase from 'firebase/compat/app';
// import "firebase/compat/auth";

/*************************************************
 * React Context and Provider for Current User
 ************************************************/

const FirebaseAuthContext = React.createContext<StateData | null>(null);
type Props = {
  children: JSX.Element;
};

interface StateData {
  userDataPresent: boolean;
  user: User | null;
  listener: Unsubscribe | null;
}

function FirebaseAuthProvider(props: Props) {
  const [state, changeState] = useState<StateData>({
    userDataPresent: false,
    user: null,
    listener: null,
  });

  useEffect(() => {
    if (state.listener == null) {
      changeState({
        ...state,
        listener: auth.onAuthStateChanged((user) => {
          if (user)
            changeState((oldState) => ({
              ...oldState,
              userDataPresent: true,
              user: user,
            }));
          else
            changeState((oldState) => ({
              ...oldState,
              userDataPresent: true,
              user: null,
            }));
        }),
      });
    }
    return () => {
      if (state.listener) state.listener();
    };
  }, [state]);

  return (
    <FirebaseAuthContext.Provider value={state}>
      {props.children}
    </FirebaseAuthContext.Provider>
  );
}

/**
const FirebaseAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

function FirebaseAuthProvider(props: Props) {
  const [state, changeState] = useState<StateData>({
    userDataPresent: false,
    user: null,
    listener: null,
  });

  useEffect(() => {
    if (state.listener == null) {
      changeState({
        ...state,
        listener: auth.onAuthStateChanged((user) => {
          if (user)
            changeState((oldState) => ({
              ...oldState,
              userDataPresent: true,
              user: user,
            }));
          else
            changeState((oldState) => ({
              ...oldState,
              userDataPresent: true,
              user: null,
            }));
        }),
      });
    }
    return () => {
      if (state.listener) state.listener();
    };
  }, [state]);

  return (
    <FirebaseAuthContext.Provider value={state}>
      {props.children}
    </FirebaseAuthContext.Provider>
  );
}

function useFirebaseAuth() {
  const context = React.useContext(FirebaseAuthContext);
  if (context === null) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context;
}
*/

export { FirebaseAuthContext, FirebaseAuthProvider };
