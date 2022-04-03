import { useState, useEffect } from 'react';
import { getUserById, appUser } from '../data/userData';
import { useFirebaseAuth } from "../context/AuthContext";

/******************************************************
 * Custom hook for getting the curent user data
 * (firstName, lastName, username, email, friends, likes)
 * If there is no current user it returns null
 ******************************************************/

  //get current user by id, if there is a logged in user
export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<appUser>();
  const authUser = useFirebaseAuth();

  // Load current user from Firestore db
  useEffect( () => {
    let user;
    (async () => {
      if(authUser) {
        user = await getUserById(authUser.uid);
      }
      if (user) {
        //set current user info
        console.log(`current user is: ${JSON.stringify(user)}`);
        setCurrentUser(user);
      }
    })();
  }, []);
  return currentUser;
}