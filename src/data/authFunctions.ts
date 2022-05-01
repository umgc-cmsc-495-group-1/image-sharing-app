import { auth } from "../firebaseSetup";
import { createUser, deleteUserDoc } from "./userData";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  sendPasswordResetEmail,
  updateEmail,
  deleteUser,
  updateProfile
} from "firebase/auth";
import {
  UserInterface,
  GoogleUserType,
  UserCheckInterface,
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
  return user.username === "" || user.email === "" || user.password === "";
};



/******************************** CREATE / REGISTER  *****************************************************/


/**
 * @description Registers user and creates a new user in firestore
 * @param user : UserInterface
 * @returns
 */
const signup = async (user: UserInterface) => {
  let res: UserCredential;
  let result: UserCheckInterface | undefined;
  // data is empty, do not create user
  if (checkEmptyValues(user)) {
    result = {
      status: 400,
      user: null,
      message: "Required items are missing",
    };
    return Promise.reject(result);
    // TODO: write custom error to throw during creation to trigger during Promise
  } else if (!PASSWORD_REGEX.test(user.password)) {
    result = {
      status: 400,
      user: null,
      message:
        "Please enter a password between 8 and 20 characters. You must have at least 1 Uppercase, 1 lowercase, 1 number and 1 special character. The only special characters allowed are: ! $ #",
    };
    return Promise.reject(result);
  } else if (!checkEmptyValues(user) && PASSWORD_REGEX.test(user.password)) {
    // empty data checks have passed, create the user
    res = await createUserWithEmailAndPassword(auth, user.email, user.password);
    await createUser(res.user, user);
    updateName(user.displayName);
    result = {
      status: 201,
      user: res.user,
      message: "User successfully created",
    };
    return Promise.resolve(result);
  } else {
    result = {
      status: 400,
      user: null,
      message: "Unknown issues, please try again",
    };
    return Promise.reject(result);
  }
};

/**
 *  @description Google Popup Sign Up / Sign In
 *  Function should check to see if email is entered in
 *  Firestore, if it isn't a new user document should
 *  be created
 */
const signInGooglePopup = async () => {
  let user: GoogleUserType;
  let addedUser: UserCredential["user"];

  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        // const token = credential.accessToken;
      }
      // The signed-in user info.
      addedUser = result.user;

     // FirebaseUserMetadata metadata = auth.currentUser.getMetadata();
      if (addedUser.metadata.creationTime == addedUser.metadata.lastSignInTime) {
        user = {
          displayName: addedUser.displayName || "",
          email: addedUser.email || "",
        };

        createUser(addedUser, user);
        updateName(user.displayName);
      }
      return Promise.resolve(addedUser);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`${errorCode}, ${errorMessage}`);
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(`email: ${email}`);
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
      return Promise.reject(error);
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
        console.log(`Email for ${user.email} successfully updated`);
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
        console.log(`Email update for ${user.email} failed`);
      });
};

/**
 * @description Update Profile displayName
 * called with auth.currentUser.displayName
 * @param displayName
 * @param imgUrl
 */
const updateName = (displayName: string) => {
  const user = auth.currentUser;
  if (user) {
    updateProfile(user, {
      displayName: displayName
    })
      .then(() => {
        // Profile updated!
        console.log(`${user.displayName} your profile has been updated`);
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });
  }
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
        console.log("password reset email sent");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}: ${errorMessage}`)
        console.log("email not sent");
      });
}

/******************************** DELETE *****************************************************/

/**
 * @description Deletes user's auth and data from databases
 * including profile photo and all posts
 * so any photos will be removed
 */
const deleteAccount = async () => {
  const user = auth.currentUser;
  if (user) {
    await deleteAllPosts(user.uid);
    await deleteProfileImg(user.uid);
    await deleteUserDoc(user.uid);
    await deleteUser(user)
      .then(() => {
        console.log(`The account number ${user.uid} has been deleted`);
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
        console.log(
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
  deleteAccount
};

