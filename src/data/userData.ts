<<<<<<< HEAD
import 'firebase/storage'
import { collection, doc, setDoc, deleteDoc, getDoc, getDocs, getDocsFromServer } from 'firebase/firestore'
import { query, where } from 'firebase/firestore'
import { fireStore } from '../firebaseSetup'
import { googleUser, newUser } from './authFunctions'
import { User } from 'firebase/auth'
=======
import { User } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import "firebase/storage";
import { fireStore } from "../firebaseSetup";
import { newUser } from "./authFunctons";
>>>>>>> dev

/***********************************************************
 *
 * User Functions: Create New User, Delete User (not tested)
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
export interface appUser {
<<<<<<< HEAD
  uid: string,
  first?: string,
  last?: string,
  username?: string,
  displayName: string,
  email: string,
  bio?: string,
  friends: string[],
  likes: string[]
}

/**
 * Gets reference to the User collection
 */
const usersRef = collection(fireStore, 'users')

/**
 * Createa a new user document in Firestore 'users' collection
 * @param user
 * @param userInfo
 */
export const createUser = async (user: User, userInfo: newUser | googleUser) => {
  // Write to firestore db
  try {
    await setDoc(doc(usersRef, `${user.uid}`), {
      uid: user.uid,
      first: userInfo.first || '',
      last: userInfo.last || '',
      displayName: user.displayName,
      username: user.displayName,
      email: user.email,
      bio: '',
      friends: [],
      likes: []
    })
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get single user with field value
 * choices: UID, first, last, username, email
 * @param userId
 * @returns
 */
export const getUserByUserId = async (userId: string) => {
  const userRef = doc(fireStore, 'users', userId)
  const docSnap = await getDoc(userRef)

  if (!docSnap.exists()) {
    console.log('No user document found')
    return
  }
  const data = docSnap.data();
  const user: appUser = {
    uid: data.uid,
    username: data.username,
    displayName: data.displayName,
    first: data.first,
    last: data.last,
    email: data.email,
    bio: data.bio,
    likes: data.likes,
    friends: data.friends
  }
  console.log('user data: ', user.username)

  return user
}

/**
 * Get single user with Email value
 * @param email
 */
export const emailInDb = async (email: string) => {
  const q = query(collection(fireStore, "users"), where("email", "==", email));

  const querySnapshot = await getDocsFromServer(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    console.log(doc.data.length);
    return doc.data.length > 0;
=======
  uid: string;
  displayName: string;
  username: string;
  email: string;
  friends: [];
  likes: [];
}

// Gets reference to the User collection
const usersRef = collection(fireStore, "users");

// add a new user
export const createUser = async (user: User, userInfo: newUser) => {
  // write to fireStore db
  await setDoc(doc(usersRef, `${user.uid}`), {
    uid: user.uid,
    displayName: userInfo.displayName,
    userName: userInfo.username,
    email: user.email,
    friends: [],
    likes: [],
  });
};

// update user profile - find correct syntax
export const updateUser = async (user: appUser) => {
  // const docRef = fireStore.doc(`/users/${user.uid}`)
  // const docRef = doc(fireStore, 'users', `${user.uid}`)
  // const docSnap = await getDoc(docRef)
  const usersRef = doc(fireStore, "users", "BJ");
  await setDoc(usersRef, { user }, { merge: true });

  // return docRef.update(user)
};
// Delete user
export const deleteUser = async (user: appUser) => {
  await deleteDoc(doc(fireStore, "users", `${user.uid}`))
};

// Gets all users
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(fireStore, "users"));
  querySnapshot.forEach((doc) => {

    doc.data(); // is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
>>>>>>> dev
  });
}

<<<<<<< HEAD
// break profile updates out into their own folder?
// update functions must incorporate db and auth functions
/**
 * Update user profile information not in auth.currentUser
 * @param user
 */
export const updateUser = async (user: appUser) => {
  // const docSnap = await getDoc(docRef);
  const docRef = doc(fireStore, 'users', `${user.uid}`)
  await setDoc(docRef, { user }, { merge: true })

  // return docRef.update(user);
}

=======
// upload an avatar --
// TODO: fix
/*
export const uploadAvatar = (user.uid, File, progress) => {
  return new Promise((resolve, reject) => {
    const path = `users/${userId}/avatar`
    const newAvatarRef = ref(storage, path)

    const imgURL = getDownloadURL(newAvatarRef)
    const uploadImg = uploadBytesResumable(newAvatarRef, file)

    uploadImg.on(
      'state_changed',
      (snapshot) => progress(snapshot),
      (error) => reject(error),
      () => {
        resolve(uploadImg.snapshot.ref)
      }
    )
  })
}
>>>>>>> dev

/**
 * Delete User
 * this function deletes the user document in Firestore
 * it is called by main delete function in
 *  authFunctions
 * @param userId
 */


<<<<<<< HEAD
/**
 * Delete user document from Firestore
 * This function is used by deleteAccount in authFunctions
 * @param userId
 */
export const deleteUserDoc = async (userId: string) => {
  await deleteDoc(doc(fireStore, 'users', `${userId}`))
};

/**
 * Gets all users in Firestore 'users' collection
 */
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(fireStore, 'users'))
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    return doc.data();
  })
}
/**
 * import {query, collection, onSnapshot, orderBy} from 'firebase/firestore'

...
const orderedOrders = query(ref, orderBy('created', 'desc'))
onSnapshot(orderedOrders, snapshot => {
     setOrders(snapshot.docs.map(doc => ({
       id: doc.id,
       data: doc.data()
     })))
  })
...
 */

=======
export const getDownloadUrl = async (userId, fileName) => {
  const filePath = `users/${userId}/${fileName}`
  const fileRef = ref(storage, filePath)
  console.log(getDownloadURL(fileRef))
  return getDownloadURL(fileRef)
}

*/
>>>>>>> dev
