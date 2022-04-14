import { useState, useEffect } from 'react'
import { photoData } from '../data/interfaces';
import { getAllUserPhotoData, getPhotoUrl } from '../data/photoData';

/**
 * React Hook to get all photos in a collection
 * using the user's ID
 * @param userId
 * @returns photos: DocumentData
 */

// Sets as photoData
export const usePhotos = (userId: string) => {

  const [photos, setPhotos] = useState<photoData[] | []>([]);
  // Load user's photo collection from Firestore db
  useEffect(() => {
    async function getPhotos() {
      let usersPhotos = await getAllUserPhotoData(userId);
      try {
        usersPhotos.map((photo) => {
          if (photo.path)
            getPhotoUrl(photo.path).then((url) => !!url && (photo.url = url));
        })
      } catch (e) {
        usersPhotos = [];
         console.log(e);
      }
      setPhotos(usersPhotos);
    }
    getPhotos();
  }, [userId]);

  return { photos };
}