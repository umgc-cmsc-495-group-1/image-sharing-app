import { useContext, useEffect, useState } from "react";
import { AppUserInterface } from "../types/authentication";
import { getExplore } from "../data/photoData";
import { FeedPostType } from "../types/appTypes";
import { AuthContext } from "../context/AuthContext";

async function getPhotos(user: AppUserInterface) {
  const { totalPosts, size } = await getExplore(user);
  return { totalPosts, size };
}

export const useExplore = () => {
  const [posts, setPosts] = useState<FeedPostType[]>([]);
  const { appUser } = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      if (!appUser) return;
      getPhotos(appUser).then((photos) => {
        setPosts(photos.totalPosts);
      });
    };
    fetch();
  }, [appUser]);

  return posts;
};
