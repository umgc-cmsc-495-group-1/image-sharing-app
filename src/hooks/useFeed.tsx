import { useState, useEffect } from 'react'
import { FeedPostType } from '../types/appTypes';
import { getAllFeedData, getPhotoUrl } from '../data/photoData';
import { AppUserInterface } from '../types/authentication';

/**
 * React Hook to get all photos in a collection
 * using the user's ID
 * @param userId
 * @returns {FeedPostType[]}
 */


// Sets as photoData
export const useFeed = (user: AppUserInterface) => {

  const [photos, setPhotos] = useState<FeedPostType[] | []>([]);
  // Load user's photo collection from Firestore db
  useEffect(() => {
    async function getPhotos() {
      let usersPhotos = await getAllFeedData(user);
      console.log(user.username)
      try {
        usersPhotos.map((photo) => {
          getPhotoUrl(photo.path!).then((url) => !!url && (photo.imageUrl = url));
        })
      } catch (e) {
        usersPhotos = [];
         console.log(e);
      }
      if (usersPhotos)
        setPhotos(usersPhotos);
    }
    getPhotos();
  }, [user]);

  return { photos };
}