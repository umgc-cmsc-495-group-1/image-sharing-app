import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getUserByUserId } from "../data/userData";
import { AppUserInterface } from "../types/authentication";

/******************************************************
 *
 * Custom hook for getting the curent user data
 * (firstName, lastName, username, email, friends, likes)
 * If there is no current user it returns null
 *
 ******************************************************/

// get current user by id, if there is a logged in user
export const useCurrentUser = () => {
  // const userId = useContext(AuthContext)?.uid || "";
  const {user} = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState<AppUserInterface>({
    username: "",
    displayName: "",
    email: "",
    uid: "",
    first: "",
    last: "",
    friends: [],
    likes: [],
    bio: "",
    interests: [],
  });

  // Load current user from Firestore db
  useEffect(() => {
    (async () => {
      if (user !== null) {
        const userByID = await getUserByUserId(user.uid);
        if (userByID !== undefined) {
          setCurrentUser(userByID);
        }
      }
    })();
  }, [user]);
  return currentUser;
};
