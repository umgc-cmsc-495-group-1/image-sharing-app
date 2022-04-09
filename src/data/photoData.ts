import 'firebase/storage';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { cloud, auth, fireStore } from '../firebaseSetup';
import { collection, setDoc, doc } from "firebase/firestore";

// import {  updateNameImgUrl } from "../data/authFunctions";

export interface photoData {
  photoId: string, // make both ids user id for profile?
  userId: string,
  imgName?: string,
  caption: string,
  numberLikes: number,
  imgURL?: string
}


// Can create custom file metadata
// ex.
/** @type {any} */
/*
interface metadata {
  customMetadata: {
    'type': string,
    'size': number,
    "date": Date
  }
}
*/

// get url
// Returns the signed-in user's profile Pic URL.
// or if URL is empty returns placeholder image

export function getProfilePicUrl() {
  if (auth.currentUser)
    return auth.currentUser.photoURL || '/profile_placeholder.png';
}

export const updateProfileImg = async (userId: string, file: File) => {
  const path = `users/${userId}/profile-image`;

  // const cloudRef = ref(cloud, path);

  // const publicImageUrl =  getDownloadURL(cloudRef); //await
   await uploadImageFile(file, path);
}

export const uploadImage = async (id: string, data: photoData, photoFile: File) => {
  // Add a new document with a generated id
  const firestoreRef = doc(collection(fireStore, "photos")); // decide on collection vs. subcollection
  const path = `photos/${firestoreRef}/${data.imgName}`;  // decide on path
  const cloudRef = ref(cloud, path);
  const url = await getDownloadURL(cloudRef);

  const user = auth.currentUser;
  if (user) {
    const newImgData = {
      photoId: firestoreRef, // make both ids user id for profile?
      userId: user.uid,
      imgName: data.imgName,
      caption: data.caption,
      imgURL: url,
      numberLikes: 0
    }
    // Write to firestore db
    try {
      // set document data
      await setDoc(firestoreRef, newImgData);
      await uploadImageFile(photoFile, path)
    } catch (error) {
      console.log(error);
    }
  }
}



// This first saves the image in Firebase storage.
export const uploadImageFile = async (file: File, path: string) => {

  // example cloud storage file path: const path = `users/${userId}/profile-img`;

  // Get reference to the cloud storage location & upload file
  const storageRef = ref(cloud, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // TODO: handle errors
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          alert("User doesn't have permission to access the object");
          break;
        case 'storage/canceled':
          alert("Upload cancelled");
          break;

        case 'storage/unknown':
          alert("Unknown error occurred, inspect error.serverResponse")
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );
}

export const getPhotoUrl = async (userId: string) => {
  const filePath = `users/${userId}/profile-image`;
  const fileRef = ref(cloud, filePath);
  console.log("url: ", getDownloadURL(fileRef));
  return await getDownloadURL(fileRef);
};



/**
 * import { updateDoc, serverTimestamp } from "firebase/firestore";

const docRef = doc(db, 'objects', 'some-id');

// Update the timestamp field with the value from the server
const updateTimestamp = await updateDoc(docRef, {
  timestamp: serverTimestamp()
});
 */

