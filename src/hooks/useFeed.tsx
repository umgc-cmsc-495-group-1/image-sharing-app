import { useState, useEffect } from "react";
import { FeedPostType } from "../types/appTypes";
import { getAllFeedData, getPhotoUrl } from "../data/photoData";
import { AppUserInterface } from "../types/authentication";
import { useCurrentUser } from "./useCurrentUser";

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
      let usersPhotos: FeedPostType[] = await getAllFeedData(user);
      try {
        usersPhotos.map((photo) => {
          getPhotoUrl(photo.path || "").then(
            (url: string | undefined) => url && (photo.imageUrl = url)
          );
        });
      } catch (e) {
        usersPhotos = [];
        console.log(e);
      }
      setPosts(usersPhotos);
    }
    getPhotos();
  }, [user]);

  return posts;
};
