import 'firebase/storage';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { cloud, auth, fireStore } from '../firebaseSetup';
import { v4 as uuidv4 } from 'uuid';
import { setDoc, doc } from "firebase/firestore";

/************************************************************
 *
 * Photo data functions
 * Update Profile Image
 * Post New Image
 *
 ************************************************************/

// need to npm install uuid to create unique filepath for photos
// & npm install -D @types/uuid or npm i --save-dev @types/uuid
// Usage: uuidv4(); returns uid string

/**
 * Interface for firestore data
 * associated with a photo post
 */
export interface photoData {
  photoId: string, // make both ids user id for profile?
  userId: string,
  imgName?: string,
  caption?: string,
  numberLikes: number,
  comments: string[], // this may need to be moved to a sub-collection
  imgURL?: string
}

/**
 * get url
 * Returns the signed-in user's profile Pic URL
 * or if URL is empty returns placeholder image
 * @returns
 */
export function getProfilePicUrl() {
  if (auth.currentUser)
    return auth.currentUser.photoURL || '/profile_placeholder.png';
}

/**
 * Replaces user profile image
 * @param userId
 * @param file
 */
export const updateProfileImg = async (userId: string, file: File) => {
  const path = `profile-imgs/${userId}/profile-image`;
   await uploadImageFile(file, path);
}

/**
 * Upload new photo post
 * uploads new photo to cloud storage
 * and photo data to firestore db
 * @param userId
 * @param data
 * @param photoFile
 */
export const postNewImage = async (userId: string, caption: string, photoFile: File) => {
  // Create a new UID for the photo
  const imgUid = uuidv4();
  // get ext from file let extension = filename.split(".").pop();
  // imgName = imgUid + . + ext
  const path = `photos/${userId}/${imgUid}/${photoFile.name}`;  // decide on path
  // Check for valid user
  const user = auth.currentUser;
  // Get reference to subcollection path
  // (photos collection->doc w/userId key->posts collection->post data doc)
  const firestoreRef = doc(fireStore, "photos", userId, "posts", imgUid);
  if (user) {
    // Post related data to save to firestore collection
    const newImgData: photoData = {
      photoId: imgUid,
      userId: userId,
      imgName: photoFile.name || "",
      caption: caption || "",
      comments: [],
      imgURL: path,
      numberLikes: 0
    }
    // Write to firestore db
    try {
      // set document data
      await setDoc(firestoreRef ,newImgData);
      await uploadImageFile(photoFile, path)
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 *  Save image file (.png, .jpg) to Cloud Storage path
 * @param file
 * @param path
 */
const uploadImageFile = async (file: File, path: string) => {

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

/**
 * Get URL for profile image
 * @param userId
 * @returns
 */
export const getProfileUrl = async (userId: string) => {
  const filePath = `profile-imgs/${userId}/profile-image`;
  const fileRef = ref(cloud, filePath);
  console.log("url: ", getDownloadURL(fileRef));
  return await getDownloadURL(fileRef);
};

// TODO:

// 1. Get one photo
// includes: photo url, photo data obj from firestore, metadata?

// 2. Delete one photo, file in storage and data in firestore

// 3. Get all  photos (urls) in a path 'photos/userID' and 'userID/posts' collection
// from firestore

// 4. Delete all users photo files and photo data



/*
// Get cloud storage url
export const getPhotoUrl = async (userId: string, file: File) => {
  const filePath = `photos/${userId}/${file.name}`;
  const fileRef = ref(cloud, filePath);
  console.log("url: ", getDownloadURL(fileRef));
  return await getDownloadURL(fileRef);
};
*/

/**
 * import { updateDoc, serverTimestamp } from "firebase/firestore";

const docRef = doc(db, 'objects', 'some-id');

// Update the timestamp field with the value from the server
const updateTimestamp = await updateDoc(docRef, {
  timestamp: serverTimestamp()
});
 */
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
