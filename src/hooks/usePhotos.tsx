import { useState, useEffect } from 'react'
// import { DocumentData } from 'firebase/firestore';
// import { fireStore } from '../firebaseSetup';
import { photoData } from '../data/PhotoClasses';
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
          getPhotoUrl(photo.path!).then((url) => !!url && (photo.url = url));
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