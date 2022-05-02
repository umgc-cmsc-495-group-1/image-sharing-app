import {
  ref,
  getDownloadURL,
  StorageReference,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
import { storage, firestore } from "../firebaseSetup";
import { v4 as uuidv4 } from "uuid";
import {
  arrayUnion,
  setDoc,
  doc,
  getDoc,
  collection,
  updateDoc,
  getDocs,
  query,
  orderBy,
  where,
  serverTimestamp,
  deleteDoc,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { CommentType, FeedPostType } from "../types/appTypes";
import { AppUserInterface } from "../types/authentication";
import Resizer from "react-image-file-resizer";
import { UserInterestsType } from "../types/interests";
import { User } from "firebase/auth";
import {
  WhereFilterOp,
  FieldPath,
  OrderByDirection,
} from "@firebase/firestore-types";

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

/*
// Firebase cannot get photo urls or display post photos without a path
// firebase also needs the path to delete the posts
const profileUrl = (uid: string, pid: string, name: string) => {
  return `photos/${uid}/${pid}`;
}
*/

/******************************** CREATE *****************************************************/

/**
 * @description Uploads image file to firebase storage
 * @param classification
 * @param description
 * @param isPrivate
 * @param user
 * @param currentFile
 */
const fabPostCallback = async (
  classification: UserInterestsType,
  description: string,
  isPrivate: boolean,
  user: User | null,
  currentFile: File | undefined
) => {
  if (user !== null && currentFile !== undefined) {
    const uid = user.uid;
    const pid = uuidv4() + "." + currentFile.name.split(".").pop();
    console.log(currentFile.name.split(".").pop());
    const cloudPath = `photos/${uid}/${pid}`;
    const firestorePath = `posts/${pid}`;
    const firestoreRef = doc(firestore, firestorePath);
    const currentPost: FeedPostType = {
      uid: uid,
      username: user.displayName,
      pid: pid,
      postText: description,
      likes: [],
      comments: [],
      isPrivate: isPrivate,
      classification: classification,
      imageUrl: "",
      path: cloudPath,
      timestamp: serverTimestamp(),
    };
    // Write to firestore db
    try {
      // set document data
      await uploadImageFile(currentFile, cloudPath);
      await setDoc(firestoreRef, currentPost);
      setTimeout(async () => {
        await updatePublicUrl(firestorePath, cloudPath);
      }, 500);
      // Add public URL to post data document
    } catch (error) {
      console.log(error);
    }
  }
};

/**
 * @description Save image file (.png, .jpg) to Cloud Storage path
 * @param file
 * @param path
 */
/*
const uploadImageFile = async (file: File, path: string) => {
  // example storage file path: const path = `users/${userId}/profile-img`;
  // TODO: make this match photo extension? does this allow png upload?
  const metadata = {
    contentType: file.type,
  };
  // Get reference to the storage location & upload file
  const storageRef = ref(storage, path);
  // const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  const imgForUpload: File = await resizeImage(file);
  const uploadTask = uploadBytesResumable(storageRef, imgForUpload, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // TODO: handle errors
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          alert("User doesn't have permission to access the object");
          break;
        case "storage/canceled":
          alert("Upload cancelled");
          break;

        case "storage/unknown":
          alert("Unknown error occurred, inspect error.serverResponse");
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        // get downloadURL here if needed
      });
    }
  );
};
*/
const uploadImageFile = async (file: File, path: string) => {
  const resizedImage = await resizeImage(file);
  const storageRef = ref(storage, path);
  uploadBytes(storageRef, resizedImage).then((snapshot) => {
    console.log(snapshot);
    console.log("Uploaded file!");
  });
};

/******************************** MIDDLEWARE for fabPostCallback ******************************************/

/**
 * @description Checks if image exceeds 8MB size limit. If so, resizes. If not, passes it back unchanged.
 * @param source Source file object
 * @returns source file compressed to fit image size limit if necessary, or uncompressed if not.
 */
const resizeImage = async (source: File) =>
  new Promise<File>((resolve) => {
    const resolution = 100;
    if (source.size > 8000000) {
      Resizer.imageFileResizer(
        source,
        1280,
        1024,
        "JPEG",
        resolution,
        0,
        (uri) => uri,
        "base64"
      );
      // Resizer.imageFileResizer(source, 1280, 1024, "JPEG", resolution, 0, (uri) => {
      //   console.log(uri)
      // }, "base64")
    }
    resolve(source);
  });

/******************************** RETRIEVE *****************************************************/

/**
 * Get URL for profile image
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
 * @description Get live post by id
 * @param postId : string
 * @param callback : function
 * @returns unsubscribe function
 */
const getLivePost = async (
  postId: string,
  // eslint-disable-next-line no-unused-vars
  callback: (_post: FeedPostType) => void
) => {
  const unsubscribe = onSnapshot(doc(firestore, "posts", postId), (doc) => {
    const gotPost: FeedPostType = {
      uid: doc.data()?.uid,
      username: doc.data()?.username,
      pid: doc.data()?.pid,
      postText: doc.data()?.postText,
      likes: doc.data()?.likes,
      isPrivate: doc.data()?.isPrivate,
      comments: doc.data()?.comments,
      classification: doc.data()?.classification,
      timestamp: doc.data()?.timestamp,
    };
    callback(gotPost);
  });
  return unsubscribe;
};

const getOnePost = async (postId: string) => {
  // may have to rethink having userID in path?

  const postRef = doc(firestore, "posts", postId);
  const docSnap = await getDoc(postRef);

  if (!docSnap.exists()) {
    console.log("No photo document found");
    return;
  }
  const data = docSnap.data();
  const postData: FeedPostType = {
    pid: data.pid, // make both ids user id for profile?
    uid: data.uid,
    username: data.username,
    postText: data.postText || "",
    // numberLikes: data.numberLikes,
    comments: data.comments,
    likes: data.likes,
    isPrivate: data.isPrivate,
    // numberComments: data.numberComments,
    classification: data.classification,
    path: data.path,
    timestamp: data.timestamp,
    // tags: data.tags,
    imageUrl: data.imageUrl,
  };

  return Promise.resolve(postData);
};

/**
 * @description Get live userposts by id
 * @param userId : string
 * @param callback : function
 * @returns unsubcribe function
 */
const getLiveUserPostData = async (
  userId: string,
  // eslint-disable-next-line no-unused-vars
  callback: (_feedPosts: FeedPostType[]) => void
) => {
  const collectionRef = collection(firestore, "posts");
  const q = query(
    collectionRef,
    where("uid", "==", userId),
    orderBy("timestamp", "desc")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const feedPosts: FeedPostType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const imgData: FeedPostType = {
        pid: data.pid,
        uid: data.uid,
        username: data.username,
        postText: data.postText || "",
        comments: data.comments,
        likes: data.likes,
        isPrivate: data.isPrivate,
        classification: data.classification,
        path: data.path,
        timestamp: data.timestamp,
        imageUrl: data.imageUrl,
      };
      feedPosts.push(imgData);
    });
    callback(feedPosts);
  });
  return unsubscribe;
};

/**
 * @description Get all photos of friends, sort by timestamp
 * @param user
 * @returns
 */
const getFriendsFeedData = async (user: AppUserInterface) => {
  const userPosts: FeedPostType[] = [];

  if (!user.friends.length) {
    return [];
  }

  await populateFeedPosts(
    userPosts,
    "uid",
    "in",
    user.friends,
    true,
    "timestamp",
    "desc"
  );
  return Promise.resolve(userPosts);
};

const getPublicFeedData = async () => {
  const userPosts: FeedPostType[] = [];
  await populateFeedPosts(
    userPosts,
    "isPrivate",
    "==",
    false,
    true,
    "timestamp",
    "desc"
  );
  return Promise.resolve(userPosts);
};

/**
 * Get all the photos depending on the query parameters
 * @param userPosts {FeedPostType[]} Array of photos
 * @param fieldPath {string} Field to sort by
 * @param opString {string} Operator to sort by
 * @param value {any} Value to sort by
 * @param isOrderBy {boolean} Whether to sort by orderBy or orderByKey
 * @param fieldPathOrderBy {string} Field to sort by
 * @param directionStr {string} Direction to sort by
 */

async function populateFeedPosts(
  userPosts: FeedPostType[],
  fieldPath: string,
  opString: WhereFilterOp,
  value: string[] | boolean,
  isOrderBy: boolean,
  fieldPathOrderBy: string | FieldPath,
  directionStr: OrderByDirection
) {
  const collectionRef = collection(firestore, "posts");
  let q;
  if (isOrderBy) {
    q = query(
      collectionRef,
      where(`${fieldPath}`, `${opString}`, value),
      orderBy(`${fieldPathOrderBy}`, `${directionStr}`)
    );
  } else {
    q = query(collectionRef, where(`${fieldPath}`, `${opString}`, value));
  }
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    const imgData: FeedPostType = {
      pid: data.pid,
      uid: data.uid,
      username: data.username,
      postText: data.postText || "",
      comments: data.comments,
      isPrivate: data.isPrivate,
      likes: data.likes,
      classification: data.classification,
      path: data.path,
      timestamp: data.timestamp,
      imageUrl: data.imageUrl,
    };
    userPosts.push(imgData);
  });
}

/******************************** UPDATE *****************************************************/

/**
 * @description Replaces user profile image
 * @param userId
 * @param file
 */
const updateProfileImg = async (userId: string, file: File) => {
  const path = `profile-imgs/${userId}/profile-image`;
  await uploadImageFile(file, path);
};

/**
 * @description Get Post data from firestore
 * @param postId - postId
 * @param comment - CommentType
 * @returns : post data doc: Promise<FeedPostType | undefined>
 */

const postComment = async (postId: string, comment: CommentType) => {
  const postRef = doc(firestore, "posts", postId);

  await updateDoc(postRef, {
    comments: arrayUnion(comment),
  });
};

const updateIsPrivate = async (postId: string, isPrivate: boolean) => {
  const postRef = doc(firestore, "posts", postId);
  await updateDoc(postRef, {
    isPrivate: isPrivate,
  });
};

const addUserLikes = async (userId: string, postId: string) => {
  const postRef = doc(firestore, "users", userId);

  await updateDoc(postRef, {
    likes: arrayUnion(postId),
  });
};

const addPostLikes = async (postId: string, userId: string) => {
  const postRef = doc(firestore, "posts", postId);

  await updateDoc(postRef, {
    likes: arrayUnion(userId),
  });
};

const removeUserLikes = async (userId: string, postId: string) => {
  const postRef = doc(firestore, "users", userId);

  await updateDoc(postRef, {
    likes: arrayRemove(postId),
  });
};

const removePostLikes = async (postId: string, userId: string) => {
  const postRef = doc(firestore, "posts", postId);

  await updateDoc(postRef, {
    likes: arrayRemove(userId),
  });
};

/**
 * @description : increments a photo's number of 'Likes'
 * @param likeNum : number, the number of likes a photo has
 * @param pid : string , photo's unique ID
 * @returns new number of likes
 */
const incrementLikes = async (likeNum: number, pid: string) => {
  const docRef = doc(firestore, "posts", pid);
  const res = await updateDoc(docRef, { likes: likeNum + 1 });
  return Promise.resolve(res);
};

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
      // const res = updateDoc(docRef, { imageUrl: url });
      // return Promise.resolve(res);
      Promise.resolve(updateDoc(docRef, { imageUrl: url }));
      // return Promise.resolve(res);
    });
  } catch (error) {
    console.error(
      "There was an error uploading a file to Cloud Storage:",
      error
    );
  }
};

/**
 * @description updates username field on all user's posts
 * @param userId
 * @param newUsername
 */
const updateAllPosts = async (userId: string, newUsername: string) => {
  const postIDs: string[] = [];
  const collectionRef = collection(firestore, "posts");
  // Get all posts where uid == userId, in order by time posted
  const q = query(
    collectionRef,
    where("uid", "==", userId),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    postIDs.push(data.pid);
  });
  postIDs.forEach(async (pid) => {
    const docRef = doc(firestore, "posts", pid);
    await updateDoc(docRef, { username: newUsername });
  });
};

/******************************** DELETE *****************************************************/

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
  const q = query(
    collectionRef,
    where("uid", "==", userId),
    orderBy("timestamp", "desc")
  );
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
    await deleteObject(photo)
      .then(() => {
        // File deleted successfully
        console.log("image file deleted");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.log(error);
      });
  });
};

/**
 * @description Deletes profile image
 * @param uid user id
 * Cloud Storage
 */
const deleteProfileImg = async (uid: string) => {
  const path = `profile-imgs/${uid}/profile-image`;
  const photoRef = ref(storage, path);
  await deleteObject(photoRef)
    .then(() => {
      // File deleted successfully
      console.log("image file deleted");
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.log(error);
    });
};

/**
 * @description Deletes a single post
 * @param pid photo post's unique id
 */
const deletePostByPid = async (pid: string) => {
  const post = await getOnePost(pid).catch((error) => {
    console.log(error);
  });
  if (post) {
    const path = post.path;
    await deleteDoc(doc(firestore, "posts", pid));
    const photoRef = ref(storage, path);
    await deleteObject(photoRef).catch((error) => {
      console.log(error);
    });
  }
};

export {
  fabPostCallback,
  getLiveUserPostData,
  updateProfileImg,
  getLivePost,
  getOnePost,
  getProfileUrl,
  getPhotoUrl,
  getFriendsFeedData,
  getPublicFeedData,
  postComment,
  incrementLikes,
  addUserLikes,
  removeUserLikes,
  addPostLikes,
  removePostLikes,
  updateAllPosts,
  updateIsPrivate,
  deleteAllPosts,
  deletePostByPid,
  deleteProfileImg,
};
