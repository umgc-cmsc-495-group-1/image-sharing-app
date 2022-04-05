import { auth } from '../firebaseSetup'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { createUser } from './userData'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth'
/*************************************************
 *
 * Sign Up, Log In, and Log Out Functions
 *
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

  let res : UserCredential

  try {
    res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    );
  } catch (e) {
    console.log(e);
    return;
  }
  const addedUser = res.user;
  //await user.updateUser({ username: `${username}` });
  if (!addedUser) {
    return addedUser;
  }

  await createUser(addedUser, user);
  return addedUser;
}

// Logout
export const logout = async () => {
  return await firebase.auth().signOut();
}

//export const logout = async () => {
//  await signOut(getAuth())
  // this may be newer syntax
  // return signOut(getAuth);
//}

export const login = async (user: returnUser) => {
  const res = await firebase.auth().signInWithEmailAndPassword(user.email, user.password);
  return res.user
}

// TODO: add Google login option - this is popup option
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  } catch (error) {
    console.log(error)
    return
  }
}
