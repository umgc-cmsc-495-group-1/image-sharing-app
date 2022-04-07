import { auth } from '../firebaseSetup'
// import firebase from 'firebase/app'
import 'firebase/auth'
import { createUser, deleteUserDoc } from './userData'
import { GoogleAuthProvider, signInWithPopup, getRedirectResult } from 'firebase/auth'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { reauthenticateWithCredential, AuthCredential, UserCredential } from 'firebase/auth'
import { updatePassword, updateEmail, deleteUser, updateProfile } from 'firebase/auth'

/****************************************************************
 *
 * Sign Up, Log In, and Log Out Functions, Delete user account
 * Google popup signin, Google redirect signin
 * auth.currentUser updating: update password, email, displayName,
 * and photoURL
 * Request Re-authentication for password update
 * https://firebase.google.com/docs/auth/web/manage-users
 * https://firebase.google.com/docs/reference/js/v8/firebase.User
 *
 ****************************************************************/

export interface newUser {
  first?: string,
  last?: string,
  displayName?: string,
  username: string,
  email: string,
  password: string
}

export interface googleUser {
  first?: string,
  last?: string,
  displayName?: string,
  userName: string,
  email: string,
}

export interface returnUser {
  email: string,
  password: string
}

/**
 * Sign Up New User and Create a User Document in Firestore
 * @param user
 * @returns
 */
export const signup = async (user: newUser) => {

  let res: UserCredential

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
  //await user.updateUser({ displayName: `${displayName}` });
  if (!addedUser) {
    return addedUser;
  }
  await createUser(addedUser, user);
  const displayName: string = user.username || ''
  updateNameImgUrl(displayName, '')
  return addedUser;
}

/**
 * Logout User
 * @returns
 */
export const logout = async () => {
 return await auth.signOut();
  // return signOut(auth);
}

//export const logout = async () => {
//  await signOut(getAuth())
// this may be newer syntax
// return signOut(getAuth);
//}

/**
 * Login user with email and password
 * @param user
 * @returns
 */
export const login = async (user: returnUser) => {

  await signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      console.log(JSON.stringify(user))
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(`${errorCode}: ${errorMessage}`)
      alert('Login has failed. Check password and email.')
    })
  // return user
}

/**
 * Google Redirect Sign Up / Sign In (needs work if to be used)
 * requires a new sign in form ?
 */
// TODO: Google signup - creates account by redirecting to signup
export const signInGoogleRedirect = async () => {

  let user: googleUser
  let addedUser: UserCredential['user']

  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      if (result) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token)

        // The signed-in user info.
        addedUser = result.user
        if (!addedUser) {
          return addedUser;
        }
        user = {
          userName: addedUser.displayName || '',
          email: addedUser.email || ''
        }
        createUser(addedUser, user);
        // Start a sign in process for an unauthenticated user.

        // third possible parameter is popup redirect resovler
        // signInWithRedirect(auth, credential);
        return addedUser
      }
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(`${errorCode}: ${errorMessage} for ${email} ${credential}`)
    });

}



/**
 *  Google Popup Sign Up / Sign In
 *  Function should check to see if email is entered in
 *  Firestore, if it isn't a new user document should
 *  be created
 */
// TODO: add Google sign up option - this is a popup option
export const signInGooglePopup = async () => {

  let user: googleUser
  let addedUser: UserCredential['user']

  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        // const token = credential.accessToken;
      }
      // The signed-in user info.
      addedUser = result.user;
      //await user.updateUser({ displayName: `${displayName}` });
      if (!addedUser) {
        return addedUser;
      }
      user = {
        userName: addedUser.displayName || '',
        email: addedUser.email || ''
      }
      // if (emailInFirestore(user.email) != null) {
      //  console.log(`email ${user.email} is already in db`)
      //   alert(`user with ${user.email} is already registered`);
      // }
      createUser(addedUser, user);
      return addedUser


    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode}, ${errorMessage}`)
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(`email: ${email}`)
      // ...
    });
}

/**
 * Reset Email Address For Auth User
 *  TODO: add a function to userData to update
 *  that email as well
 * @param newEmail
 */
export const changeEmail = (newEmail: string) => {
  const user = auth.currentUser
  if (user)
    updateEmail(user, `${newEmail}`).then(() => {
      console.log(`Email for ${user.uid} successfully updated`)
    }).catch((error) => {
      // An error occurred
      console.log(error)
      console.log(`Email update for ${user.uid} failed`)
    });
}

/**
 * Update Profile displayName or profile URL
 * call with auth.currentUser.displayName or .photoURL
 * if not changing value
 * @param displayName
 * @param imgUrl
 */
export const updateNameImgUrl = (displayName: string, imgUrl: string) => {
  const user = auth.currentUser;
  if (user) {
    updateProfile(user, {
      displayName: displayName, photoURL: imgUrl
    }).then(() => {
      // Profile updated!
      console.log(`${user.displayName} your profile has been updated`)
    }).catch((error) => {
      // An error occurred
      console.log(error);
    });
  }

}

/**
 * Update password
 * @param newPassword
 */

// TODO: should make sure user has signed in recently. If not
// call re-auth function
export const changePassword = async (newPassword: string) => {
  const user = auth.currentUser
  // const newPass = getASecureRandomPassword()

  if (user && newPassword.length > 0)
    await updatePassword(user, newPassword).then(() => {
      alert('Password successfully updated.')
    }).catch((error) => {
      console.log(error)
      alert('Password update failed.')
    })

  alert('password updated')
}

// TODO: Re-authenticate user this should be used for password
/**
 * Re-authorizes user before
 * changes or closing accounts
 * @param credential
 */
export const reAuth = async (credential: AuthCredential) => {
  const user = auth.currentUser
  // TODO(you): prompt the user to re-provide their sign-in credentials
  // need to implement this prompt function
  // const credential = promptForCredentials();
  alert('Please enter your email and password')
  if (user && credential)
    reauthenticateWithCredential(user, credential).then(() => {
      // User re-authenticated.
    }).catch((error) => {
      // An error ocurred
      console.log(error)
    })
}

/**
 * Delete user's auth and data from databases
 * TODO: add to userData deleteUserDoc function
 * so any photos will be removed
 */
export const deleteAccount = async () => {
  const user = auth.currentUser;
  if (user) {
    deleteUserDoc(user.uid);
    deleteUser(user).then(() => {
      console.log(`The account number ${user.uid} has been deleted`)
    }).catch((error) => {
      // An error ocurred
      console.log(error)
      console.log(`An error occured while deleted the account number ${user.uid}`)
    });
  }
}

/**
 * Helper function to prevent empty form submission
 * from creating an empty auth object or Firestore doc
 * @param user
 * @returns
 */
function isEmptyForm(user: newUser | returnUser) {
 return user.email === "" || user.password === "";
}

/*

// Bits of boilerplate that may be useful

// Code to send email for password reset
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();
sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`${errorCode}: ${errorMessage}`)
    // ..
  });

// saves displayName to profile (changes auth key value?)
const saveDisplayName = async (userName: string) => {
  const user = auth.currentUser
  if (user) {
    updateProfile(user, {
      displayName: userName
    }).then(() => {
      // Profile updated!
      console.log('new userName set')
    }).catch((error) => {
      // An error occurred
      console.log(`${error}`)
      console.log(`An error occured while update display name for account number ${user.uid}`)
    })
  }
//  ////////////////////////
// Returns the signed-in user's profile Pic URL if it exists.
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}
-----------------
// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}
---------------------

*/


