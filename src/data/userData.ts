import 'firebase/storage'
import { collection, doc, setDoc, deleteDoc, getDoc, getDocs } from 'firebase/firestore'
import { fireStore } from '../firebaseSetup'
import { googleUser, newUser } from './authFunctions'
import { User } from 'firebase/auth'

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
 * Checks firestore to see if email is already in
 * database
 * returns true if email in db, false if not
 * @param email
 * @returns boolean
 */
export const isEmailInDb = async (email: string) => {

  const docRef = doc(fireStore, "users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  }
  return false;
}



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


/**
 * Delete User
 * this function deletes the user document in Firestore
 * it is called by main delete function in
 *  authFunctions
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