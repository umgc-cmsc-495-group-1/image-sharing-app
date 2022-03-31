import 'firebase/storage';
import firebase from "firebase/compat/app";
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { firestore } from "../dbHandlers/fs_emulator_connect";
import { newUser } from './authFunctons';

/***********************************************************
 * User Functions: Create New User, Delete User (not tested)
 * beginning of functions to edit user profile, upload avatar
 * and other photos, get all users
 **********************************************************/

export interface appUser {
  uid: string,
  first: string,
  last: string,
  username: string,
  email: string,
  friends: [],
  likes: []
}

// Gets reference to the User collection
const usersRef = collection(firestore, "users");

// add a new user
export const createUser = async (user: firebase.User, userInfo: newUser) => {
  // write to firestore db
  await setDoc(doc(usersRef, `${user.uid}`), {
    uid: user.uid,
    firstName: userInfo.first,
    lastName: userInfo.last,
    userName: userInfo.username,
    email: user.email,
    friends: [],
    likes: []
  });
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