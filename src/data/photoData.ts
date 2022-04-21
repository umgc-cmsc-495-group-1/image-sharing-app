import {
  ref, getDownloadURL,
  uploadBytesResumable,
  StorageReference,
  deleteObject
} from 'firebase/storage';
import { storage, auth, firestore } from '../firebaseSetup';
import { v4 as uuidv4 } from 'uuid';
import {
  setDoc, doc,
  getDoc,
  collection,
  updateDoc,
  getDocs,
  query,
  orderBy,
  where,
  serverTimestamp,
  deleteDoc
} from "firebase/firestore";
import { FeedPostType } from '../types/appTypes'
import { AppUserInterface } from '../types/authentication'

/************************************************************
 *
 * PHOTO DATA FUNCTIONS
 * Update Profile Image
 * Create new post
 * Get photo's public url
 * Get Profile image url
 * Get all feed data documents
 * Get all post data documents
 * Get a single post
 * Increment Likes on photo
 *
 ************************************************************/

/**
 * @description Replaces user profile image
 * @param userId
 * @param file
 */
const updateProfileImg = async (userId: string, file: File) => {
  const path = `profile-imgs/${userId}/profile-image`;
  await uploadImageFile(file, path);
}

/**
 * @description Upload new photo post
 * uploads new photo to storage
 * and photo data to firestore db
 * @param userId
 * @param data
 * @param photoFile
 */
const createNewPost = async (userId: string, caption: string, photoFile: File) => {
  // Create a new UID for the photo
  const imgUid = uuidv4();
  // get ext from file let extension = filename.split(".").pop();
  // imgName = imgUid + . + ext
  const cloudPath = `photos/${userId}/${imgUid}/${photoFile.name}`;  // decide on path

  // Check for valid user
  const user = auth.currentUser;
  // check for username
  const username = (auth.currentUser !== null) ? auth.currentUser.displayName : 'Chicken Sandwich'
  // Get reference to subcollection path
  // (photos collection->doc w/userId key->posts collection->post data doc)
  const firestorePath = `posts/${imgUid}`;
  const firestoreRef = doc(firestore, firestorePath);
  if (user) {
    // Post related data to save to firestore collection
    const newPostData: FeedPostType = {
      uid: userId,
      username: username,
      pid: imgUid,
      postText: caption || "",
      numberLikes: 0,
      numberComments: 0,
      imageUrl: "",
      comments: [],
      path: cloudPath,
      timestamp: serverTimestamp()
    }
    // Write to firestore db
    try {
      // set document data
      await uploadImageFile(photoFile, cloudPath);
      await setDoc(firestoreRef, newPostData);
      // Add public URL to post data document
      await updatePublicUrl(firestorePath, cloudPath);
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 * @description Save image file (.png, .jpg) to Cloud Storage path
 * @param file
 * @param path
 */
const uploadImageFile = async (file: File, path: string) => {

  // example storage file path: const path = `users/${userId}/profile-img`;
  // TODO: make this match photo extension? does this allow png upload?
  const metadata = {
    contentType: file.type
  }
  // Get reference to the storage location & upload file
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

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
        // get downloadURL here if needed
      });
    }
  );
}

/**
 * @description Get URL for profile image
 * @param userId
 * @returns
 */
const getProfileUrl = async (userId: string) => {
  const filePath = `profile-imgs/${userId}/profile-image`;
  const fileRef = ref(storage, filePath);
  console.log("url: ", getDownloadURL(fileRef));
  return await getDownloadURL(fileRef);
};

/**
   * @description Supposed to get url of photo for setting <img src>
   * @param path : photo cloud storage path
   * @returns Promise<string>
   */

const getPhotoUrl = async (path: string) => {
  const fileRef = ref(storage, path);
  let url;
  try {
    url = await getDownloadURL(fileRef);
  } catch (e) {
    console.log(`couldn't get url for photo at ${path}`);
  }
  return Promise.resolve(url);
};

/**
   * @description Get Post data from firestore
   * @param imgId
   * @returns : post data doc: Promise<FeedPostType | undefined>
   */
const getOnePost = async (postId: string) => { // may have to rethink having userID in path?

  const postRef = doc(firestore, "posts", postId);
  const docSnap = await getDoc(postRef)

  if (!docSnap.exists()) {
    console.log('No photo document found')
    return
  }
  const data = docSnap.data();
  const postData: FeedPostType = {
    pid: postId, // make both ids user id for profile?
    uid: data.userId,
    username: data.username,
    postText: data.caption || "",
    numberLikes: data.numberLikes,
    comments: data.comments,
    numberComments: data.numberComments,
    path: data.path,
    timestamp: data.timestamp,
    // tags: data.tags,
    imageUrl: data.url
  }
  // const url = await getPhotoUrl(imgData.path);
  console.log('post data: ', JSON.stringify(postData));

  return Promise.resolve(postData);
}

/**
  * @description Get all of user's photo data docs from firebase
  * @param userId : string
  * @returns
  */

const getAllPostData = async (userId: string) => {
  const userPosts: FeedPostType[] = [];
  const collectionRef = collection(firestore, "posts");
  // Get all posts where uid == userId, in order by time posted
  const q = query(collectionRef, where("uid", "==", userId), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    const imgData: FeedPostType = {
      pid: data.imgId, // make both ids user id for profile?
      uid: data.userId,
      username: data.userId,
      postText: data.caption || "",
      numberLikes: data.numberLikes,
      comments: data.comments,
      numberComments: data.numberComments,
      path: data.path,
      imageUrl: data.imageUrl
    };
    userPosts.push(imgData);
  });
  return Promise.resolve(userPosts);
}

/**
 * @description adds the public url, used to create new post
 * @param docPath
 * @param filePath
 */
const updatePublicUrl = async (docPath: string, filePath: string) => {
  try {
    const fileRef = ref(storage, filePath);
    const docRef = doc(firestore, docPath);
    await getDownloadURL(fileRef).then((url) => {
      const res = updateDoc(docRef, { imageUrl: url });
      return Promise.resolve(res);
    });
  } catch (error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  }
}

/**
 * @description : increments a photo's number of 'Likes'
 * @param likeNum : number, the number of likes a photo has
 * @param imgUid : string , photo's unique ID
 * @returns new number of likes
 */
const incrementLikes = async (likeNum: number, pid: string) => {
  const docRef = doc(firestore, "posts", pid);
  const res = await updateDoc(docRef, { likes: likeNum + 1 });
  return Promise.resolve(res);
}

/**
 * @description Get all photos of friends, sort by timestamp
 * @param userId
 * @returns
 */
const getAllFeedData = async (user: AppUserInterface) => {
  const userPosts: FeedPostType[] = [];
  // const path = `/posts/${photoId}`;
  const collectionRef = collection(firestore, "posts");

  console.log(`query user: ${user.displayName} 's feed photos`)
  const q = query(collectionRef, where("uid", "in", user.friends), orderBy("timestamp"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    const imgData: FeedPostType = {
      pid: data.imgId,
      uid: data.userId,
      username: data.username,
      postText: data.caption || "",
      numberLikes: data.numberLikes,
      comments: data.comments,
      numberComments: data.numberComments,
      path: data.path,
      imageUrl: data.imageUrl
    };
    userPosts.push(imgData);
  });
  return Promise.resolve(userPosts);
}

/**
* @description Delete all of user's photo data docs from firebase
* @param userId : string
* @returns
*/
const deleteAllPosts = async (userId: string) => {
  const postIDs: string[] = [];
  const photoRefs: StorageReference[] = [];
  const collectionRef = collection(firestore, "posts");
  // Get all posts where uid == userId, in order by time posted
  const q = query(collectionRef, where("uid", "==", userId), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    postIDs.push(data.pid);
    const photoRef = ref(storage, data.path);
    photoRefs.push(photoRef);
  });
  postIDs.forEach(async (pid) => {
    await deleteDoc(doc(firestore, "posts", pid));
  });
  photoRefs.forEach(async (photo) => {
    // Delete the file
    deleteObject(photo).then(() => {
      // File deleted successfully
      console.log("image file deleted");
    }).catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    });
  })
}

/**
 * @description Deletes a single post
 * @param pid photo post's unique id
 * @param path location path of file in
 * Cloud Storage
 */
const deletePostByPid = async (pid: string, path: string) => {
  await deleteDoc(doc(firestore, "posts", pid));

  const photoRef = ref(storage, path);
  deleteObject(photoRef).then(() => {
    // File deleted successfully
    console.log("image file deleted");
  }).catch((error) => {
    // Uh-oh, an error occurred!
    console.log(error);
  });
}

export {
  updateProfileImg,
  createNewPost,
  getAllPostData,
  getAllFeedData,
  getOnePost,
  getProfileUrl,
  getPhotoUrl,
  // getProfileUrlFromAuth,
  incrementLikes,
  deleteAllPosts,
  deletePostByPid
}


// TODO:

// 1. Done - needs testing - Delete one photo, file in storage and data in firestore

// 2. Done - needs - testing - Delete all users photo files and photo data

///////////////////////////////////////////////////////

/*
// Get storage storage url
export const getPhotoUrl = async (userId: string, file: File) => {
  const filePath = `photos/${userId}/${file.name}`;
  const fileRef = ref(storage, filePath);
  console.log("url: ", getDownloadURL(fileRef));
  return await getDownloadURL(fileRef);
};
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

