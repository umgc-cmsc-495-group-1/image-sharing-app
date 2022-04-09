import { useState, useEffect } from 'react'
import { getUserByUserId, appUser } from '../data/userData'

/******************************************************
 *
 * Custom hook for getting the curent user data
 * (firstName, lastName, username, email, friends, likes)
 * If there is no current user it returns null
 *
 ******************************************************/

// get current user by id, if there is a logged in user
export const useCurrentUser = (userId: string) => {
  const [currentUser, setCurrentUser] =
    useState<appUser>({
      username: '', displayName: '', email: '', uid: '', first: '',
      last: '', friends: [], likes: [], bio: ''
    })

  // Load current user from Firestore db
  useEffect(() => {
    let user;
    (async () => {

      user = await getUserByUserId(userId)

      if (user) {
        // set current user info
        console.log(`current user is: ${JSON.stringify(user)}`)
        setCurrentUser(user);
      }
    })()
  }, [userId])
  return currentUser
}