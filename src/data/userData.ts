import "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  getDocsFromServer,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { firestore } from "../firebaseSetup";
import {
  GoogleUserType,
  UserInterface,
  AppUserInterface,
} from "../types/authentication";
import { ProfileInterface, ProfileUpdateInterface } from "../types/appTypes";
import { changeEmail, updateName } from "./authFunctions";
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
 * @description Gets reference to the User collection
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
    email: data.email,
    bio: data.bio,
    likes: data.likes,
    friends: data.friends,
    interests: data.interests,
  };

  return user;
};

/**
 * @description Get single user with Email value
 * @param email
 */
const emailInDb = async (email: string) => {
  const q = query(collection(firestore, "users"),
    where("email", "==", email));

  const querySnapshot = await getDocsFromServer(q);
  let data = null;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    data = doc.data();
  });
  if (data !== null) {
    const profile: ProfileInterface = {
      uid: data["uid"],
      username: data["username"],
      imageUrl: data["imageUrl"],
      displayName: data["displayName"],
      email: data["email"],
      friends: data["friends"],
      likes: data["likes"],
      posts: data["posts"],
      bio: data["bio"],
    };
    return profile;
  }
};

// update functions must incorporate db and auth functions
/**
 * @description Update user profile information not in auth.currentUser
 * @param userId: string
 * @param profileData: ProfileInterface
 */
const updateProfile = async (
  userId: string,
  profileData: ProfileUpdateInterface
) => {
  // const docSnap = await getDoc(docRef);
  console.log(`updating profile ${profileData.displayName}`);
  const docRef = doc(firestore, "users", `${userId}`);
  const name = profileData.displayName;
  const email = profileData.email;
  const bio = profileData.bio;
  if (name !== "") {
    updateName(name);
  }
  if (email !== "") {
    changeEmail(email);
  }
  await updateDoc(docRef, { displayName: name, email: email, bio: bio });
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

const addFriend = async (newFriend: string, userAdding: string) => {
  const friendsRef = doc(firestore, "users", userAdding);

  await updateDoc(friendsRef, {
    friends: arrayUnion(newFriend),
  });
};

const removeFriend = async (toBeRemoved: string, userRemoving: string) => {
  const friendsRef = doc(firestore, "users", userRemoving);

  await updateDoc(friendsRef, {
    friends: arrayRemove(toBeRemoved),
  });
};

/**
 * @description Returns an array of the user's friends
 * @param friends : string[]
 * @returns : UserInterface[]
 */
 const getFriends = async (friends: string[]) => {

  const friendList: AppUserInterface[] = [];
  const q = query(usersRef, where('uid', 'in', friends));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    const friend: AppUserInterface = {
      uid: data.uid,
      displayName: data.displayName,
      username: data.username,
      email: data.email,
      bio: data.bio,
      friends: data.friends,
      likes: data.likes,
      interests: data.interests
    };
    friendList.push(friend);
  });
  return friendList;
 }

export {
  createUser,
  getUserByUserId,
  emailInDb,
  updateProfile,
  deleteUserDoc,
  getAllUsers,
  addFriend,
  removeFriend,
  getFriends,
};
