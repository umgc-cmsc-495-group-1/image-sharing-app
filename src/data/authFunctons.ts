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
};

export const login = async (user: returnUser) => {
  const res = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  return res.user;
};
