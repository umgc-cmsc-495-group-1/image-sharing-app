import { useState, useEffect } from "react";
import { FeedPostType } from "../types/appTypes";
import { getPublicFeedData } from "../data/photoData";
import { AppUserInterface } from "../types/authentication";
import { useCurrentUser } from "./useCurrentUser";
import { mapUserPhotos } from "../utils/middleware";
import {graph} from "../engine/Engine";

/**
 * React Hook to get all photos in a collection
 * using the user's ID and friend list
 * @returns photos: DocumentData
 */

// Sets as photoData
export const useExplore = () => {
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const user: AppUserInterface = useCurrentUser();
  // Load user's photo collection from Firestore db
  useEffect(() => {
    async function getPhotos() {
      if (user.uid !== "") {
        await getPublicFeedData().then(photos => {
          mapUserPhotos(photos);
          // setPosts(photos);
          const formattedPosts: FeedPostType[] = [];
          photos.forEach((post, index) => {
            graph.addNode({user: user, post: photos[index]})
          })
          graph.sort();
          console.log(graph.nodes)
          graph.nodes.forEach(node => formattedPosts.push(node.data.post))
          setPosts(formattedPosts);
        });
      }
    }
    (async () => {
      await getPhotos();
    })();
  }, [user]);
  console.log(posts)
  return posts;
};
