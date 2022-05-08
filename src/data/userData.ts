import {
  collection, doc,
  setDoc, deleteDoc,
  getDoc, getDocsFromServer,
  arrayUnion, arrayRemove,
  updateDoc, query,
  where, onSnapshot,
} from "firebase/firestore";
import { firestore } from "../firebaseSetup";
import {
  GoogleUserType,
  UserInterface,
  AppUserInterface,
} from "../types/authentication";
import { ProfileInterface, ProfileUpdateInterface } from "../types/appTypes";
import { updateName, changeEmail } from "./authFunctions";
import { updateAllPosts } from "../data/photoData";
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

/******************************** CREATE *****************************************************/
/**
 * Create a new user document in Firestore 'users' collection
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
      displayName: userInfo.displayName,
      avatarImage: userInfo.photoURL,
      email: userInfo.email,
      bio: "",
      friends: [],
      likes: [],
    });
  } catch (error) {
    console.error(error);
  }
};

/******************************** RETRIEVE *****************************************************/

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
    return Promise.reject("User does not exist");
  } else {
    const data = docSnap.data();
    const user: AppUserInterface = {
      uid: data.uid,
      displayName: data.displayName,
      email: data.email,
      avatarImage: data.avatarImage,
      isVerified: data.isVerified,
      photoURL: data.photoURL,
      bio: data.bio,
      likes: data.likes,
      friends: data.friends,
      interests: data.interests,
    };
    return Promise.resolve(user);
  }
};

/**
 * @description Get single user with Email value
 * @param email
 */
const getUserByEmail = async (email: string) => {
  const q = query(collection(firestore, "users"), where("email", "==", email));

  const querySnapshot = await getDocsFromServer(q);
  let data = null;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data = doc.data();
  });
  if (data !== null) {
    const profile: ProfileInterface = {
      uid: data["uid"],
      username: data["username"],
      imageUrl: data["imageUrl"],
      displayName: data["displayName"],
      avatarImage: data["avatarImage"],
      email: data["email"],
      friends: data["friends"],
      likes: data["likes"],
      posts: data["posts"],
      bio: data["bio"],
    };
    return profile;
  }
};

/**
 * @description Live updating friends list
 * @param userId
 * @return unsubcribe callback
 */
const getLiveFriends = async (
  userId: string,
  // eslint-disable-next-line no-unused-vars
  callback: (_friendList: string[]) => void
) => {
  const collectionRef = collection(firestore, "users");
  const q = query(collectionRef, where("uid", "==", userId));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const friendList: string[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      friendList.push(...data.friends);
    });
    callback(friendList);
  });
  return unsubscribe;
};

/*
  //saving until sure new code works consisitently

  const friendList: AppUserInterface[] = [];
  const q = query(usersRef, where('uid', 'in', friends));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    const friend: AppUserInterface = {
      uid: data.uid,
      displayName: data.displayName,
      email: data.email,
      bio: data.bio,
      friends: data.friends,
      likes: data.likes,
      interests: data.interests
    };
    friendList.push(friend);
  });
  return friendList;
  */

/******************************** UPDATE *****************************************************/

//update functions must incorporate db and auth functions
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
  const docRef = doc(firestore, "users", `${userId}`);
  const displayName = profileData.displayName;
  const email = profileData.email;
  const bio = profileData.bio;
  if (displayName !== "" || displayName !== null) {
    updateName(displayName);
  }
  if (email !== "" || email !== null) {
    changeEmail(email);
    await updateAllPosts(userId, email);
  }
  await updateDoc(docRef, { displayName: displayName, email: email, bio: bio });
  // return docRef.update(user);
};

// /**
//  * @description adds friend and update user
//  * @param newFriend
//  * @param userAdding
//  */
// <<<<<<< HEAD
// const getAllUsers = async () => {
//   const totalUsers: AppUserInterface[] = [];
//   const querySnapshot = await getDocs(collection(firestore, "users"));
//   await querySnapshot.forEach((doc) => {
//     totalUsers.push({
//       uid: doc.id,
//       displayName: doc.data().displayName,
//       email: doc.data().email,
//       avatarImage: doc.data().avatarImage,
//       isVerified: doc.data().isVerified,
//       photoURL: doc.data().photoURL,
//       bio: doc.data().bio,
//       friends: doc.data().friends,
//       likes: doc.data().likes,
//       interests: doc.data().interests,
//     });
//     // doc.data() is never undefined for query doc snapshots
//   });
//   return Promise.resolve(totalUsers)
// };
//
// // todo: shouldnt need this method anymore
// // const getTotalUsernames = async () => {
// //   const totalUsernames: string[] = [];
// //   const querySnapshot = await getDocs(collection(firestore, "users"));
// //   await querySnapshot.forEach((doc) => {
// //     totalUsernames.push(doc.data().username);
// //   });
// //   return Promise.resolve(totalUsernames);
// // }
//
// =======
// >>>>>>> dev
const addFriend = async (newFriend: string, userAdding: string) => {
  const friendsRef = doc(firestore, "users", userAdding);

  await updateDoc(friendsRef, {
    friends: arrayUnion(newFriend),
  });
};

/**
 * @description removes friend and updates user
 * @param toBeRemoved
 * @param userRemoving
 */
const removeFriend = async (toBeRemoved: string, userRemoving: string) => {
  const friendsRef = doc(firestore, "users", userRemoving);

  await updateDoc(friendsRef, {
    friends: arrayRemove(toBeRemoved),
  });
};

/******************************** DELETE *****************************************************/

const deleteUserDoc = async (userId: string) => {
  await deleteDoc(doc(firestore, "users", `${userId}`));
};

export {
  createUser,
  getLiveFriends,
  getUserByUserId,
  getUserByEmail,
  updateProfile,
  deleteUserDoc,
  addFriend,
  removeFriend,
  // getFriends,
};
