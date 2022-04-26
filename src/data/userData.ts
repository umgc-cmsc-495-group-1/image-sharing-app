import "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  getDocs,
  getDocsFromServer,
} from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { firestore } from "../firebaseSetup";
import {
  GoogleUserType,
  UserInterface,
  AppUserInterface,
} from "../types/authentication";
import { ProfileInterface } from "../types/appTypes";
// import { googleUser, newUser } from './authFunctions'
import { User } from "@firebase/auth";
import { updateName } from './authFunctions'

/***********************************************************
 *
 * User Functions: Create New User, Delete User
 * getUserById, getAllUsers
 * https://firebase.google.com/docs/reference/js/v8/firebase.User
 * latest syntax:
 * https://modularfirebase.web.app/common-use-cases/firestore/
 *
 **********************************************************/

/**
 * appUser - inteface for user
 * Bio, first, last, and username fields are optional
 */
// export interface AppUserInterface {
//   uid: string,
//   first?: string,
//   last?: string,
//   username?: string,
//   displayName: string,
//   email: string,
//   bio?: string,
//   friends: string[],
//   likes: string[]
// }

/**
 * Gets reference to the User collection
 */
const usersRef = collection(firestore, 'users');
const displayNameRef = collection(firestore, 'displayNames');


/**
 * Createa a new user document in Firestore 'users' collection
 * @param user
 * @param userInfo
 */
const createUser = async (
  user: User,
  userInfo: UserInterface | GoogleUserType
) => {
  // Write to firestore db
  try {
    await setDoc(doc(usersRef, `${user.uid}`), {
      uid: user.uid,
      first: userInfo.first || "",
      last: userInfo.last || "",
      displayName: userInfo.displayName,
      username: userInfo.username,
      email: userInfo.email,
      bio: "",
      friends: [],
      likes: [],
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get single user with field value
 * choices: UID, first, last, username, email
 * @param userId
 * @returns
 */
const getUserByUserId = async (userId: string) => {
  const userRef = doc(firestore, "users", userId);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    console.log("No user document found");
    return;
  }
  const data = docSnap.data();
  const user: AppUserInterface = {
    uid: data.uid,
    username: data.username,
    displayName: data.displayName,
    first: data.first,
    last: data.last,
    email: data.email,
    bio: data.bio,
    likes: data.likes,
    friends: data.friends,
    interests: data.interests,
  };

  return user;
};

/**
 * Get single user with Email value
 * @param email
 */
const emailInDb = async (email: string) => {
  const q = query(collection(firestore, "users"), where("email", "==", email));

  const querySnapshot = await getDocsFromServer(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    console.log(doc.data.length);
    return doc.data.length > 0;
  });
};

// break profile updates out into their own folder?
// update functions must incorporate db and auth functions
/**
 * @description Update user profile information not in auth.currentUser
 * @param userId: string
 * @param profileData: ProfileInterface
 */
const updateUser = async (userId: string, profileData: ProfileInterface) => {
  // const docSnap = await getDoc(docRef);
  const docRef = doc(firestore, "users", `${userId}`);
  await setDoc(docRef, { profileData }, { merge: true });

  // return docRef.update(user);
};

const updateDisplayName = async (userId: string, oldName: string, newName: string) => {
  let res;

  // Check if name is already taken, if not do updates
  if (!displayNameExists(newName)) {
    try {
      // Remove old display name doc from collection
      await deleteDoc(doc(firestore, "displayNames", oldName));
      // Create a new doc
      await saveDisplayName(newName, userId);
      // Update the User object displayName field
      updateName(newName);
      // Update the user doc in the users collection
      const docRef = doc(firestore, "users", userId);
      res = await updateDoc(docRef, { displayName: newName });
      return Promise.resolve(res);
    } catch(e) {
      console.log("Could not update displayName", e);
    }
  }
  console.log ("This name is already taken");
  return Promise.reject(res);
}

/**
 * @description Delete user document from Firestore
 * This function is used by deleteAccount in authFunctions
 * @param userId
 */
const deleteUserDoc = async (userId: string) => {
  await deleteDoc(doc(firestore, "users", `${userId}`));
};

/**
 * @description Gets all users in Firestore 'users' collection
 */
const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    return doc.data();
  });
};

/**
 * @description Returns true if displayName exists in
 * displayName firestore collection
 * @param name : string
 * @returns boolean
 */
const displayNameExists = async (name: string) => {
  const nameRef = doc(displayNameRef, name);
  const docSnap = await getDoc(nameRef);
  return docSnap.exists();
}

/**
 * @description creates a document with displayName as unique key
 * @param name : string user's displayName
 * @param uid : string
 */
const saveDisplayName = async (name: string, uid: string) => {
  await setDoc(doc(displayNameRef, name), {
    uid: uid,
  });
}


export {
  createUser,
  getUserByUserId,
  emailInDb,
  updateUser,
  deleteUserDoc,
  getAllUsers,
  displayNameExists,
  saveDisplayName,
  updateDisplayName
}
