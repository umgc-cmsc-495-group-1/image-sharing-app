import 'firebase/storage'
import { collection, doc, setDoc, getDocs, deleteDoc, getDoc } from 'firebase/firestore'
import { fireStore } from '../firebaseSetup'
import { newUser } from './authFunctions'
import { User } from 'firebase/auth'

/***********************************************************
 *
 * User Functions: Create New User, Delete User (not tested)
 * beginning of functions to edit user profile, upload avatar
 * and other photos, get all users
 *
 **********************************************************/

export interface appUser {
  uid: string,
  first: string,
  last: string,
  userName: string,
  displayName?: string,
  email: string,
  bio?: string,
  friends: string[],
  likes: string[]
}

// Gets reference to the User collection
const usersRef = collection(fireStore, 'users')

// Add a new user
export const createUser = async (user: User, userInfo: newUser) => {
  // Write to firestore db
  try {
    await setDoc(doc(usersRef, `${user.uid}`), {
      uid: user.uid,
      first: userInfo.first,
      last: userInfo.last,
      userName: userInfo.userName,
      displayName: userInfo.displayName,
      email: user.email,
      bio: '',
      friends: [],
      likes: []
    })
  } catch (error) {
    console.log(error);
  }
}

// Get user with UID value
export const getUserById = async (userId: string) => {
  const userRef = doc(fireStore, 'users', userId)
  const docSnap = await getDoc(userRef)

  if (!docSnap.exists()) {
    console.log('No user document found')
    return
  }
  const data = docSnap.data();
  const user: appUser = {
    uid: data.uid,
    userName: data.userName,
    displayName: data.displayName,
    first: data.first,
    last: data.last,
    email: data.email,
    bio: data.bio,
    likes: data.likes,
    friends: data.friends
  }
  console.log('user data: ', user.userName)

  return user
}

// update user profile - find correct syntax
export const updateUser = async (user: appUser) => {
  // const docRef = doc(fireStore, 'users', `${user.uid}`);
  // const docSnap = await getDoc(docRef);
  const usersRef = doc(fireStore, 'users', `${user.uid}`)  //??? shouldn't this be user uid instead of string 'BJ'
  await setDoc(usersRef, { user }, { merge: true })

  // return docRef.update(user);
}
// Delete user
// TODO: user should have to enter auth info before delete
// should input just be user id?
export const deleteUser = async (user: appUser) => {
  await deleteDoc(doc(fireStore ,'users', `${user.uid}`))
};


// Gets all users
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(fireStore, 'users'))
  querySnapshot.forEach((doc) => {
   doc.data() //is never undefined for query doc snapshots
  console.log(doc.id, ' => ', doc.data());
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

// upload an avatar --
// TODO: fix
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