import {useEffect, useState} from "react";
import {AppUserInterface} from "../types/authentication";
import {getExplore} from "../data/photoData";
import {FeedPostType} from "../types/appTypes";
import {useCurrentUser} from "./useCurrentUser";


async function getPhotos(user: AppUserInterface) {
  const {totalPosts, size} = await getExplore(user)
  return {totalPosts, size}
}


export const useExplore = () => {
  const [posts, setPosts] = useState<FeedPostType[]>([])
  const user: AppUserInterface = useCurrentUser();

  useEffect(() => {
    return () => {
      getPhotos(user).then(photos => {
        setPosts(photos.totalPosts)
      })
    };
  }, [posts, user]);

  return posts
}
