import { auth } from '../firebaseSetup'
// import firebase from 'firebase/app'
import 'firebase/auth'
import { createUser } from './userData'
import { GoogleAuthProvider, signInWithPopup, getRedirectResult } from 'firebase/auth'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { reauthenticateWithCredential, AuthCredential, UserCredential } from 'firebase/auth'
import { updatePassword, updateEmail, deleteUser } from 'firebase/auth'

/****************************************************************
 *
 * Sign Up, Log In, and Log Out Functions
 * https://firebase.google.com/docs/auth/web/manage-users
 * https://firebase.google.com/docs/reference/js/v8/firebase.User
 *
 ****************************************************************/

export interface newUser {
  first?: string,
  last?: string,
  displayName?: string,
  userName: string,
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

// export const signup = async ({ firstName, lastName, email, password, displayName }) => {   //orig. code
// could add displayName to this?
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
  return addedUser;
}

// Logout
export const logout = async () => {
  return await auth.signOut();
}

//export const logout = async () => {
//  await signOut(getAuth())
// this may be newer syntax
// return signOut(getAuth);
//}

// Login user with email and password
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

// TODO: Google signup - creates account by redirecting to signup
export const signInGoogleRedirect =  async () => {

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

//reset email address
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

// Update password
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
// changes and closing accounts or could change to send email
// for extra verification
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

//delete user's auth , add to delete user in user functions
// TODO: add userData function to delete documents belonging to
// this user
export const deleteAccount = () => {
  const user = auth.currentUser;
  if (user) {
    deleteUser(user).then(() => {
      console.log(`The account number ${user.uid} has been deleted`)
    }).catch((error) => {
      // An error ocurred
      console.log(error)
      console.log(`An error occured while deleted the account number ${user.uid}`)
    });
  }
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
      console.log(`An error occured while deleted the account number ${user.uid}`)
    })
  }
//  ////////////////////////
// Returns the signed-in user's profile Pic URL.
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


