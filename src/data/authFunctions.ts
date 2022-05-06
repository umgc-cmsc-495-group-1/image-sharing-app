import { auth } from "../firebaseSetup";
import { createUser, deleteUserDoc } from "./userData";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  sendPasswordResetEmail,
  updateEmail,
  deleteUser,
  updateProfile,
  getRedirectResult
} from "firebase/auth";
import {
  UserInterface,
  GoogleUserType,
} from "../types/authentication";
import { deleteAllPosts, deleteProfileImg } from "./photoData";
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!$#])[A-Za-z0-9!$#]{8,20}$/;

/****************************************************************
 *
 * Sign Up, Log In, and Log Out Functions, Delete user account
 * Google popup sign in, Google redirect sign in
 * auth.currentUser updating: update password, email, displayName,
 * and photoURL
 * Request Re-authentication for password update
 * https://firebase.google.com/docs/auth/web/manage-users
 * https://firebase.google.com/docs/reference/js/v8/firebase.User
 *
 ****************************************************************/

/******************************** MIDDLEWARE *****************************************************/

const checkEmptyValues = (user: UserInterface): boolean => {
  return user.email === "" || user.password === "";
};

/******************************** CREATE / REGISTER  *****************************************************/

/**
 * @description Registers user and creates a new user in firestore
 * @param user : UserInterface
 * @returns
 */
const signup = async (user: UserInterface) : Promise<UserCredential | undefined> => {
  let res;
  // data is empty, do not create user
  if (checkEmptyValues(user)) {
    return Promise.reject({
      code: "auth/empty-values",
      message: "Required items are missing"
    });
  } else if (!PASSWORD_REGEX.test(user.password)) {
    return Promise.reject({
      code: "auth/weak-password",
      message: "Please enter a password between 8 and 20 characters. You must have at least 1 Uppercase, 1 lowercase, 1 number and 1 special character. The only special characters allowed are: ! $ #"
    });
  } else if (!checkEmptyValues(user) && PASSWORD_REGEX.test(user.password)) {
    // empty data checks have passed, create the user
    res = await createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(userCredential => {
        return Promise.resolve(userCredential);
      })
      .catch(error => {
        return Promise.reject(error);
      });
    await createUser(res.user, user);
    await updateName(user.displayName);
  }
  return res;
};

/**
 * Google Redirect Sign Up / Sign In (needs work if to be used)
 * requires a new sign-in form ?
 */
const signInGoogleRedirect = async () => {
  let googleUserInfo: GoogleUserType;

  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  provider.setCustomParameters({
    prompt: "select_account",
  });

  await signInWithRedirect(auth, provider);
  const result = await getRedirectResult(auth);
  if (result) {
    const user = result.user;
    googleUserInfo = {
      displayName: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      isVerified: user.emailVerified || false,
    };
    await createUser(user, googleUserInfo);
  }
};

/**
 *  @description Google Popup Sign Up / Sign In
 *  Function should check to see if email is entered in
 *  Firestore, if it isn't a new user document should
 *  be created
 */
const signInGooglePopup = async () => {
  let googleUserInfo: GoogleUserType;

  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  provider.setCustomParameters({
    prompt: "select_account",
  });
  await signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      // This gives you a Google Access Token. You can use it to access the Google API.
      googleUserInfo = {
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
        isVerified: user.emailVerified || false,
      };
      createUser(user, googleUserInfo);

      return Promise.resolve(googleUserInfo);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`${errorCode}, ${errorMessage}`);
    });
};

/******************************** LOG IN *****************************************************/

/**
 * Login user with email and password
 * @param email - user email
 * @param password - user password
 * @returns {Promise<UserCredential>}
 */
const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((error) => {
      return Promise.reject({
        code: error.code,
        message: error.message
      });
    });
};

/******************************** LOG OUT *****************************************************/

/**
 * @description Logout User
 * @returns
 */
const logout = async () => {
  return await auth.signOut();
};

/******************************** UPDATE firebase.User ***********************************************/

/**
 *  @descriptionReset Email Address For Auth User
 *  TODO: add a function to userData to update
 *  that email as well
 * @param newEmail
 */
const changeEmail = (newEmail: string) => {
  const user = auth.currentUser;
  if (user)
    updateEmail(user, `${newEmail}`)
      .then(() => {
        // TODO: user settings UI updated here
      })
      .catch((error) => {
        // An error occurred
        console.error(error);
        console.error(`Email update for ${user.email} failed`);
      });
};

/**
 * @description Update Profile displayName
 * called with auth.currentUser.displayName
 * @param displayName
 */
const updateName = async (displayName: string) => {
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, {
      displayName: displayName
    })
  }
  return Promise.resolve(user);
};

/**
 * @description Sends email with link to
 * reset password
 *
 * WARNING: WILL NOT WORK WITH EMULATORS
 * WILL LOCK ACCOUNT
 */
// TODO: example - can add as parameter
// of action settting add url to redirect user
// const resetActionCodeSettings = {
//  url: 'https://www.example.com/?email=' //+ auth.currentUser.email,
// };
const passwordResetEmail = async () => {
  const user = auth.currentUser;
  const email = user?.email;
  if (email)
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`${errorCode}: ${errorMessage}`);
        console.error("email not sent");
      });
};

/******************************** DELETE ACCOUNT *****************************************************/

/**
 * @description Deletes All user data from all databases
 * including, firebase.User, user, profile photo, and all post photos and data
 */
const deleteAccount = async () => {
  const user = auth.currentUser;
  if (user) {
    await deleteAllPosts(user.uid);
    await deleteProfileImg(user.uid);
    await deleteUserDoc(user.uid);
    await deleteUser(user)
      .then(() => {
        //
      })
      .catch((error) => {
        // An error occurred
        console.error(error);
        console.error(
          `An error occurred while deleted the account number ${user.uid}`
        );
      });
  }
};

export {
  signup,
  logout,
  login,
  signInGooglePopup,
  changeEmail,
  updateName,
  passwordResetEmail,
  deleteAccount,
  signInGoogleRedirect
};
