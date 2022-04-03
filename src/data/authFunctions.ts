import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseSetup";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { createUser } from "./userData";

/*************************************************
 * Sign Up, Log In, and Log Out Functions
 ************************************************/

export interface newUser {
  first: string,
  last: string,
  username: string,
  email: string,
  password: string
}

export interface returnUser {
  email: string,
  password: string
}

//export const signup = async ({ firstName, lastName, email, password, username }) => {   //orig. code
export const signup = async (user: newUser) => {
  const res = await firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password);
  const addedUser = res.user;
  //await user.updateUser({ username: `${username}` });
  if (!addedUser) {
    return addedUser;
  }

  createUser(addedUser, user);
  return addedUser;
};

export const logout = () => {
  return firebase.auth().signOut();
  // this may be newer syntax
  // return signOut(getAuth);
};

// TODO: add Google login option this is popup option
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

// Password and email login
export const loginWithPassword = async (user: returnUser) => {
  const res = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  return res.user;
};
