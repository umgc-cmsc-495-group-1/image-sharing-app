import { useState, useEffect } from "react";
import { FeedPostType } from "../types/appTypes";
import { getFriendsFeedData } from "../data/photoData";
import { AppUserInterface } from "../types/authentication";
import { useCurrentUser } from "./useCurrentUser";
import { mapUserPhotos } from "../utils/middleware";

/**
 * React Hook to get all photos in a collection
 * using the user's ID and friend list
 * @returns photos: DocumentData
 */

// Sets as photoData
export const useFeed = () => {
  const [posts, setPosts] = useState<FeedPostType[] | []>([]);
  const user: AppUserInterface = useCurrentUser();
  // Load user's photo collection from Firestore db
  useEffect(() => {
    async function getPhotos() {
      let usersPhotos: FeedPostType[] = await getFriendsFeedData(user);
      try {
        mapUserPhotos(usersPhotos);
      } catch (e) {
        usersPhotos = [];
        console.log(e);
      }
      setPosts(usersPhotos);
    }
    (async () => {
      await getPhotos();
    })();
  }, [user]);

  return posts;
};
