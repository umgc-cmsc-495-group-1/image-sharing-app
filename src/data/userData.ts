import 'firebase/storage'
import { collection, doc, setDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore'
// import { query, where } from 'firebase/firestore'
import { fireStore } from '../firebaseSetup'
import { googleUser, newUser } from './authFunctions'
import { User } from 'firebase/auth'

/***********************************************************
 *
 * User Functions: Create New User, Delete User (not tested)
 * getUserById, getAllUsers
 * https://firebase.google.com/docs/reference/js/v8/firebase.User
 *
 **********************************************************/

// Bio field is optional
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
export const createUser = async (user: User, userInfo: newUser | googleUser) => {
  // Write to firestore db
  try {
    await setDoc(doc(usersRef, `${user.uid}`), {
      uid: user.uid,
      first: userInfo.first || '',
      last: userInfo.last || '',
      userName: user.displayName,
      email: user.email,
      bio: '',
      friends: [],
      likes: []
    })
  } catch (error) {
    console.log(error);
  }
}

// Get single user with UID value
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

// Get single user with UID value
export const getUserByEmail = async (email: string) => {
  const userRef = doc(fireStore, 'users', email)
  const docSnap = await getDoc(userRef)

  if (!docSnap.exists()) {
    console.log('No user document found')
    return null
  }
  const data = docSnap.data();
  const user: appUser = {
    uid: data.uid,
    userName: data.userName,
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
// break profile updates out into their own folder
// update functions must incorporate db and auth functions
export const updateUser = async (user: appUser) => {
  // const docRef = doc(fireStore, 'users', `${user.uid}`);
  // const docSnap = await getDoc(docRef);
  const usersRef = doc(fireStore, 'users', `${user.uid}`)
  await setDoc(usersRef, { user }, { merge: true })

  // return docRef.update(user);
}
// Delete user
// TODO: this just deletes user's doc in firestore
// this function should be called by main delete function in
// auth functions
export const deleteUser = async (userId: string) => {
  await deleteDoc(doc(fireStore ,'users', `${userId}`))
};


// Gets all users
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
