import { useState, useEffect } from "react";
import { FeedPostType } from "../types/appTypes";
import { getFeed } from "../data/photoData";
import { AppUserInterface } from "../types/authentication";
import { useCurrentUser } from "./useCurrentUser";
import { FieldValue } from "firebase/firestore";

/**
 * React Hook to get all photos in a collection
 * using the user's ID and friend list
 * @returns photos: DocumentData
 */

// Sets as photoData
export const useFeed = (nextTimestamp: FieldValue | undefined) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Array<FeedPostType>>([]);
  const [lastTimestamp, setLastTimestamp] = useState<FieldValue | undefined>(
    undefined
  );
  const user: AppUserInterface = useCurrentUser();

  useEffect(() => {
    const fetch = async () => {
      if (nextTimestamp) {
        await getFeed(user, 2, false, nextTimestamp).then((res) => {
          setPosts((prevPosts) => {
            return [...prevPosts, ...res.posts];
          });
          setLastTimestamp(res.lastTimestamp);
          setLoading(false);
        });
      } else {
        await getFeed(user, 2, false).then((res) => {
          setPosts(() => {
            return [...res.posts];
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
