import 'firebase/storage'
import { collection, doc, setDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore'
// import { query, where } from 'firebase/firestore'
import { fireStore } from '../firebaseSetup'
import { newUser } from './authFunctions'
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
  username: string,
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
      username: user.displayName,
      //email: user.email, // want to remove this so email only
                         // in auth and only needs updating in one location
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
    username: data.username,
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

