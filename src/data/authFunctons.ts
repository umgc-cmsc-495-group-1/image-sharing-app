import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { createUser } from './userData'
import { auth } from '../firebaseSetup'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
/*************************************************
 * Sign Up, Log In, and Log Out Functions
 ************************************************/

export interface newUser {
  displayName: string;
  username: string;
  email: string;
  password: string;
  verifyPassword: string;
}

export interface returnUser {
  email: string;
  password: string;
}

// export const signup = async ({ firstName, lastName, email, password, username }) => {   //orig. code
export const signup = async (user: newUser) => {


  let res: UserCredential

  try {
    res = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    )
  } catch (e) {
    console.log(e)
    return
  }
  const addedUser = res.user
  // await user.updateUser({ username: `${username}` })
  if (!addedUser) {
    return addedUser
  }

  createUser(addedUser, user)
  return addedUser
}

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  await (signInWithPopup(auth, provider))
}

export const logout = () => {
  auth.signOut()
}

export const login = async (user: returnUser) => {
  const res = await firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  return res.user
}
