import "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
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
const usersRef = collection(firestore, "users");

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
  console.log("adding user:" + user + " " + userInfo);
  try {
    await setDoc(doc(usersRef, `${user.uid}`), {
      uid: user.uid,
      first: userInfo.first || "",
      last: userInfo.last || "",
      displayName: userInfo.displayName,
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
 * Update user profile information not in auth.currentUser
 * @param user
 */
const updateUser = async (userId: string, profileData: ProfileInterface) => {
  // const docSnap = await getDoc(docRef);
  const docRef = doc(firestore, "users", `${userId}`);
  await setDoc(docRef, { profileData }, { merge: true });

  // return docRef.update(user);
};

/**
 * Delete user document from Firestore
 * This function is used by deleteAccount in authFunctions
 * @param userId
 */
const deleteUserDoc = async (userId: string) => {
  await deleteDoc(doc(firestore, "users", `${userId}`));
};

/**
 * Gets all users in Firestore 'users' collection
 */
const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    return doc.data();
  });
};

const updateBio = async (userId: string, bio: string) => {
  const docRef = doc(firestore, "users", `${userId}`);
  await updateDoc(docRef, { bio: bio });
}

const updateDisplayName = async (userId: string, displayName: string) => {
  const docRef = doc(firestore, "users", `${userId}`);
  await updateDoc(docRef, { displayName: displayName });
}

export {
  createUser,
  getLiveFriends,
  getUserByUserId,
  getUserByEmail,
  updateProfile,
  deleteUserDoc,
  addFriend,
  removeFriend,
  updateBio,
  updateDisplayName
};
