import 'firebase/storage';
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";
import { fireStore } from "../firebaseSetup";
import { newUser } from './authFunctons';
import { User } from 'firebase/auth';

/***********************************************************
 * User Functions: Create New User, Delete User (not tested)
 * beginning of functions to edit user profile, upload avatar
 * and other photos, get all users
 **********************************************************/

export interface appUser {
  uid: string,
  displayName: string,
  username: string,
  email: string,
  friends: [],
  likes: []
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
    likes: []
  });
};

// update user profile - find correct syntax
export const updateUser = async (user: appUser) => {
  //const docRef = fireStore.doc(`/users/${user.uid}`);
  //const docRef = doc(fireStore, "users", `${user.uid}`);
  //const docSnap = await getDoc(docRef);
  const usersRef = doc(fireStore, 'users', 'BJ');
  await setDoc(usersRef, { user }, { merge: true });

  //return docRef.update(user);
};
// Delete user
export const deleteUser = async (user: appUser) => {
  await deleteDoc(doc(fireStore ,"users", `${user.uid}`))
};

// Gets all users
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(fireStore, "users"));
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
