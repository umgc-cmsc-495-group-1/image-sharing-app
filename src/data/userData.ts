import "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocsFromServer,
  arrayUnion,
  arrayRemove,
  updateDoc,
  onSnapshot
} from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { firestore } from "../firebaseSetup";
import {
  GoogleUserType,
  UserInterface,
  AppUserInterface,
} from "../types/authentication";
import { ProfileInterface, ProfileUpdateInterface } from "../types/appTypes";
import { updateName, changeEmail } from "./authFunctions";
import { updateAllPosts } from '../data/photoData'
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
 * Create a a new user document in Firestore 'users' collection
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
  if (data != undefined) {
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


/**
 * @description Returns an array of the user's friends
 * @param friends : string[]
 * @returns : UserInterface[]
 */
 const getFriends = async (
  friends: string[],
  // eslint-disable-next-line no-unused-vars
  callback: (_friendList: AppUserInterface[]) => void
) => {
  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where('uid', 'in', friends));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const friendList: AppUserInterface[] = [];
    querySnapshot.forEach((doc) => {
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
    callback(friendList);
  });
  return unsubscribe;
}

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
const updateProfile = async (userId: string, profileData: ProfileUpdateInterface) => {
  // const docSnap = await getDoc(docRef);
  console.log(`updating profile ${profileData.displayName}`)
  const docRef = doc(firestore, "users", `${userId}`);
  const displayName = profileData.displayName;
  const email = profileData.email;
  const bio = profileData.bio;
  if (displayName !== '' || displayName !== null) {
    updateName(displayName);
  }
  if (email !== '' || email !== null) {
    changeEmail(email);
    await updateAllPosts(userId, email);
  }
  await updateDoc(docRef, { displayName: displayName, email: email, bio: bio });
  // return docRef.update(user);
};

/**
 * @description adds friend and update user
 * @param newFriend
 * @param userAdding
 */
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

/**
 * Delete user document from Firestore
 * This function is used by deleteAccount in authFunctions
 * @param userId
 */
const deleteUserDoc = async (userId: string) => {
  await deleteDoc(doc(firestore, "users", `${userId}`));
};


export {
  createUser,
  getUserByUserId,
  getUserByEmail,
  updateProfile,
  deleteUserDoc,
  addFriend,
  removeFriend,
  getFriends,
};
