import { useState, useEffect } from 'react'
import { getAllPostData, getPhotoUrl } from '../data/photoData';
import { FeedPostType } from '../types/appTypes'
// import { AppUserInterface } from '../types/authentication';


/**
 * @description React Hook to get all post related data for a user
 * using the user's ID
 * @param userId
 * @returns photos: DocumentData
 */

// Sets as photoData
export const usePosts = (userId: string) => {

  const [photos, setPosts] = useState<FeedPostType[] | []>([]);
  // Load user's photo collection from Firestore db
  useEffect(() => {
    async function getPosts() {
      let usersPosts = await getAllPostData(userId);
      try {
        usersPosts.map((post) => {
          if (post.path)
            getPhotoUrl(post.path).then((url) => !!url && (post.imageUrl = url));
        })
      } catch (e) {
        usersPosts = [];
         console.log(e);
      }
      setPosts(usersPosts);
    }
    getPosts();
  }, [userId]);

  return { photos };
}

