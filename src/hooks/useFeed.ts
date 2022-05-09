import { useState, useEffect, useContext } from "react";
import { FeedPostType } from "../types/appTypes";
import { getFeed } from "../data/photoData";
import { FieldValue } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

/**
 * React Hook to get all photos in a collection
 * using the appUser's ID and friend list
 * @returns photos: DocumentData
 */

// Sets as photoData
export const useFeed = (nextTimestamp: FieldValue | undefined) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Array<FeedPostType>>([]);
  const [lastTimestamp, setLastTimestamp] = useState<FieldValue | undefined>(
    undefined
  );
  const { appUser } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      if (!appUser) return;
      if (nextTimestamp) {
        await getFeed(appUser, 2, false, nextTimestamp).then((res) => {
          setPosts((prevPosts) => {
            return [...prevPosts, ...res.posts];
          });
          setLastTimestamp(res.lastTimestamp);
          setLoading(false);
        });
      } else {
        await getFeed(appUser, 2, false).then((res) => {
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
  }, [appUser, nextTimestamp]);

  return { loading, posts, lastTimestamp };
};
