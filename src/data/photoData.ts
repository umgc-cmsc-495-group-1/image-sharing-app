import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage, auth, firestore } from '../firebaseSetup';
import { v4 as uuidv4 } from 'uuid';
import { setDoc, doc } from "firebase/firestore";
// import { PhotoDataInterface } from '../types/photoTypes';
import { FeedPostType } from '../types/appTypes'
import Resizer from 'react-image-file-resizer'

/************************************************************
 *
 * Photo data functions
 * Update Profile Image
 * Post New Image
 *
 ************************************************************/

/**
 * get url
 * Returns the signed-in user's profile Pic URL
 * or if URL is empty returns placeholder image
 * @returns
 */
function getProfilePicUrl() {
  if (auth.currentUser)
    return auth.currentUser.photoURL || '/profile_placeholder.png';
}

/**
 * Replaces user profile image
 * @param userId
 * @param file
 */
const updateProfileImg = async (userId: string, file: File) => {
  const path = `profile-imgs/${userId}/profile-image`;
  await uploadImageFile(file, path);
}

/**
 * Upload new photo post
 * uploads new photo to storage 
 * and photo data to firestore db
 * @param userId
 * @param data
 * @param photoFile
 */
const postNewImage = async (userId: string, caption: string, photoFile: File) => {
  // Create a new UID for the photo
  const imgUid = uuidv4();
  // get ext from file let extension = filename.split(".").pop();
  // imgName = imgUid + . + ext
  const path = `photos/${userId}/${imgUid}/${photoFile.name}`;  // decide on path

  // Check for valid user
  const user = auth.currentUser;
  // check for username
  const username = (auth.currentUser !== null) ? auth.currentUser.displayName : 'Chicken Sandwich'
  // Get reference to subcollection path
  // (photos collection->doc w/userId key->posts collection->post data doc)
  const firestoreRef = doc(firestore, "photos", userId, "posts", imgUid);
  if (user) {
    // Post related data to save to firestore collection 
    const newImgData: FeedPostType = {
      uid: userId,
      username: username,
      pid: imgUid,
      postText: caption || "",
      numberLikes: 0,
      numberComments: 0,
      imageUrl: path,
      comments: [],
    }
    // const newImgData: PhotoDataInterface = {
    //   photoId: imgUid,
    //   userId: userId,
    //   imgName: photoFile.name || "",
    //   caption: caption || "",
    //   comments: [],
    //   imgURL: path,
    //   numberLikes: 0
    // }
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

/**
 *  Save image file (.png, .jpg) to Cloud Storage path
 * @param file
 * @param path
 */
const uploadImageFile = async (file: File, path: string) => {

  // example storage file path: const path = `users/${userId}/profile-img`;
  const metadata = {
    contentType: 'image/jpeg'
  }
  // Get reference to the storage location & upload file
  const storageRef = ref(storage, path);

  const imgForUpload: File = await resizeImage(file);
  //Stores image in variable to allow resizing
  
  const uploadTask = uploadBytesResumable(storageRef, imgForUpload, metadata);

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
 * Checks if image exceeds 8MB size limit. If so, resizes. If not, passes it back unchanged.
 * @param source Source file object
 * @returns source file compressed to fit image size limit if necessary, or uncompressed if not.
 */
const resizeImage = async (source: File) => new Promise<File>((resolve) => {
  const resolution = 100;
  //Resizer.imageFileResizer uses a 1-100 scale for image quality. 100 is max quality.
  if (source.size > 8000000) {
    /*Checks if image is above 8MB limit. File.size counts in bytes, 1,000,000 bytes per megabyte,
    so 8,000,000 bytes. If it exceeds limit, calls logic to resize the image. Otherwise ignores
    resizing logic and returns original file.*/
    Resizer.imageFileResizer(source, 1280, 1024, "JPEG", resolution, 0, (uri) => {
      console.log(uri)
    }, "base64")
  }
  resolve(source)
})

/**
 * Get URL for profile image
 * @param userId
 * @returns
 */
const getProfileUrl = async (userId: string) => {
  const filePath = `profile-imgs/${userId}/profile-image`;
  const fileRef = ref(storage, filePath);
  console.log("url: ", getDownloadURL(fileRef));
  return await getDownloadURL(fileRef);
};

export {
  getProfilePicUrl,
  updateProfileImg,
  postNewImage,
  uploadImageFile,
  getProfileUrl
}


// TODO:

// 1. Get one photo
// includes: photo url, photo data obj from firestore, metadata?

// 2. Delete one photo, file in storage and data in firestore

// 3. Get all  photos (urls) in a path 'photos/userID' and 'userID/posts' collection
// from firestore

// 4. Delete all users photo files and photo data



/*
// Get storage storage url
export const getPhotoUrl = async (userId: string, file: File) => {
  const filePath = `photos/${userId}/${file.name}`;
  const fileRef = ref(storage, filePath);
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
//** @type {any} */
/*
interface metadata {
  customMetadata: {
    'type': string,
    'size': number,
    "date": Date
  }
}
*/
