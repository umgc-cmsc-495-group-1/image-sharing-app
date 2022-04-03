import 'firebase/storage';
import firebase from "firebase/compat/app";
import { collection, doc, setDoc, getDocs, deleteDoc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseSetup";
import { newUser } from './authFunctions';
//import { getAuth } from 'firebase/auth';

/***********************************************************
 * User Functions: Create New User, Delete User (not tested)
 * beginning of functions to edit user profile, upload avatar
 * and other photos, get all users
 **********************************************************/

export interface appUser {
  uid: string,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  friends: Array<string>[],
  likes: Array<string>[]
}

type firestore = firebase.firestore.Firestore | null;

// Gets reference to the User collection
const usersRef = collection(firestore, "users");

// add a new user
export const createUser = async (user: firebase.User, userInfo: newUser) => {
  // write to firestore db
  try {
    await setDoc(doc(usersRef, `${user.uid}`), {
      uid: user.uid,
      firstName: userInfo.first,
      lastName: userInfo.last,
      username: userInfo.username,
      email: user.email,
      friends: [],
      likes: []
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (userId: string) => {
  const userRef = doc(firestore, 'users', userId);
  const docSnap = await getDoc(userRef);

  if(!docSnap.exists()) {
    console.log("No user document found");
    return;
  }

  const data = docSnap.data();
  const current = {
    uid: data.uid,
    username: data.username,
    firstName: data.first,
    lastName: data.last,
    email: data.email,
    likes: data.likes,
    friends: data.friends
  };
  console.log("user data: ", current.username);
  return current;
};

// update user profile - find correct syntax
export const updateUser = async (user: appUser) => {
  //const docRef = firestore.doc(`/users/${user.uid}`);
  //const docRef = doc(firestore, "users", `${user.uid}`);
  //const docSnap = await getDoc(docRef);
  const usersRef = doc(firestore, 'users', 'BJ');
  await setDoc(usersRef, { user }, { merge: true });

  //return docRef.update(user);
};
// Delete user
// TODO: user should have to enter auth info before delete
export const deleteUser = async (user: appUser) => {
  await deleteDoc(doc(firestore ,"users", `${user.uid}`))
};

// Gets all users
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
   doc.data() //is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  });
};

// Get URL of user's avatar
/*
function getAvatarUrl() {
  let url;
  const user = getAuth().currentUser;
  if (user) {
    return  user.photoURL || '/path/of/placeholder.png';
  }
}
*/

// upload an avatar --
//TODO: fix
/*
export const uploadAvatar = (user.uid, File, progress) => {
  return new Promise((resolve, reject) => {
    const path = `users/${userId}/avatar`;
    const newAvatarRef = ref(storage, path);

    const imgURL = getDownloadURL(newAvatarRef);
    const uploadImg = uploadBytesResumable(newAvatarRef, file);

    uploadImg.on(
      'state_changed',
      (snapshot) => progress(snapshot),
      (error) => reject(error),
      () => {
        resolve(uploadImg.snapshot.ref);
      }
    );
  });
};



export const getDownloadUrl = async (userId, fileName) => {
  const filePath = `users/${userId}/${fileName}`;
  const fileRef = ref(storage, filePath);
  console.log(getDownloadURL(fileRef));
  return getDownloadURL(fileRef);
};

*/