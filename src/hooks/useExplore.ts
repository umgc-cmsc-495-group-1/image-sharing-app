import { useState, useEffect } from "react";
import { FeedPostType } from "../types/appTypes";
import { AppUserInterface } from "../types/authentication";
import { useCurrentUser } from "./useCurrentUser";
import { getFeed } from "../data/photoData";
import { FieldValue } from "firebase/firestore";
// import {graph} from "../engine/Engine";

/**
 * React Hook to get all photos in a collection
 * using the user's ID and friend list
 * @returns photos: DocumentData
 */

// Sets as photoData
export const useExplore = (nextTimestamp: FieldValue | undefined) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const [lastTimestamp, setLastTimestamp] = useState<FieldValue | undefined>(
    undefined
  );

  const user: AppUserInterface = useCurrentUser();
  // Load user's photo collection from Firestore db
  useEffect(() => {
    const fetch = async () => {
      if (nextTimestamp) {
        await getFeed(user, 2, true, nextTimestamp).then((res) => {
          setPosts((prevPosts) => {
            return [...prevPosts, ...res.posts];
          });
          setLastTimestamp(res.lastTimestamp);
          setLoading(false);
        });
      } else {
        await getFeed(user, 2, true).then((res) => {
          setPosts((prevPosts) => {
            return [...prevPosts, ...res.posts];
          });
          setLastTimestamp(res.lastTimestamp);
          setLoading(false);
        });
      }
    };
    setLoading(true);
    fetch();
  }, [user, nextTimestamp]);

  return { loading, posts, lastTimestamp };
};
