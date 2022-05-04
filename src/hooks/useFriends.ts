import { useState, useEffect } from "react";
import { getLiveFriends } from "../data/userData";
import { AppUserInterface } from "../types/authentication";
import { useCurrentUser } from "./useCurrentUser";

/**
 * @description React Hook to get all friends of the current user
 * @returns photos: DocumentData
 */

// Sets as photoData
export const useFriends = () => {
  const [friendsList, setFriendsList] = useState<Array<string>>([]);
  const user: AppUserInterface = useCurrentUser();

  useEffect(() => {
    async function getFriendList() {
      // let friendList: AppUserInterface[];
      try {
        await getLiveFriends(user.uid, setFriendsList)
      } catch (e) {
        //friendList = [];
        console.error(e);
      }
      // setFriends(friendList);
    }
    getFriendList();
  }, [user]);

  return friendsList;
};
