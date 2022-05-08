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
  limit,
  FieldValue,
  startAfter,
} from "firebase/firestore";
import {CommentType, FeedPostInterface, FeedPostType} from "../types/appTypes";
import { AppUserInterface } from "../types/authentication";
import { UserInterestsType } from "../types/interests";
import { updateProfile, User } from "firebase/auth";
import {
  WhereFilterOp,
  FieldPath,
  OrderByDirection,
} from "@firebase/firestore-types";
import {comparator, Graph} from "../engine/Engine";

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
    const pid = uuidv4();
    const cloudPath = `photos/${uid}/${pid}`;
    const firestorePath = `posts/${pid}`;
    const photoRef = ref(storage, cloudPath);
    // Write to firestore db
    try {
      // set document data
      await uploadBytes(photoRef, currentFile);
      setTimeout(async () => {
        await getDownloadURL(photoRef).then((url) => {
          const currentPost: FeedPostType = {
            uid: uid,
            username: user.displayName,
            pid: pid,
            postText: description,
            likes: [],
            comments: [],
            isPrivate: isPrivate,
            classification: classification,
            imageUrl: url,
            path: cloudPath,
            timestamp: serverTimestamp(),
          };
          setDoc(doc(firestore, firestorePath), currentPost);
        });
      }, 1200);
    } catch (error) {
      console.error(error);
    }
  }
};

const uploadProfileImg = async (
  user: User | null,
  currentFile: File | undefined
) => {
  if (user !== null && currentFile !== undefined) {
    const uid = user.uid;
    const cloudPath = `profile-imgs/${uid}`;
    const uploadRef = ref(storage, cloudPath);
    const usersRef = collection(firestore, "users");
    try {
      await uploadBytes(uploadRef, currentFile);
      setTimeout(async () => {
        await getDownloadURL(uploadRef).then((url) => {
          setDoc(doc(usersRef, uid), {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            bio: "",
            friends: [],
            likes: [],
            avatarImage: url,
          });
          updateProfile(user, { photoURL: url });
        });
      }, 1200);
    } catch (error) {
      console.error(error);
    }
  }
};

/******************************** RETRIEVE *****************************************************/

// /**
//  * Get URL for profile image
//  * @description Get URL for profile image
//  * @param userId
//  * @returns
//  */
// const getProfileUrl = async (userId: string) => {
//   const filePath = `profile-imgs/${userId}/profile-image`;
//   const fileRef = ref(storage, filePath);
//   return await getDownloadURL(fileRef);
// };

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
    console.error(`couldn't get url for photo at ${path} ` + e);
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
      imageUrl: doc.data()?.imageUrl,
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
 * @description Get all of user's photo data docs from firebase
 * @param userId : string
 * @returns
 */
const getAllPostData = async (userId: string) => {
  const userPosts: FeedPostType[] = [];
  const collectionRef = collection(firestore, "posts");
  // Get all posts where uid == userId, in order by time posted
  const q = query(
    collectionRef,
    where("uid", "==", userId),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    const imgData: FeedPostType = {
      pid: data.imgId, // make both ids user id for profile?
      uid: data.userId,
      username: data.userId,
      postText: data.caption || "",
      // numberLikes: data.numberLikes,
      comments: data.comments,
      likes: data.likes,
      isPrivate: data.isPrivate,
      classification: data.classification,
      // numberComments: data.comments,
      path: data.path,
      timestamp: data.timestamp,
      imageUrl: data.imageUrl,
    };
    userPosts.push(imgData);
  });
  return Promise.resolve(userPosts);
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

const getFeed = async (
  user: AppUserInterface,
  numPosts: number,
  explore: boolean,
  lastTimestamp?: FieldValue
) => {
  const posts: FeedPostType[] = [];
  if (!user.friends.length && !explore) {
    return { posts, lastTimestamp };
  }
  const collectionRef = collection(firestore, "posts");
  let q;
  if (!explore) {
    if (!lastTimestamp) {
      q = query(
        collectionRef,
        where("uid", "in", user.friends),
        orderBy("timestamp", "desc"),
        limit(numPosts)
      );
    } else {
      q = query(
        collectionRef,
        where("uid", "in", user.friends),
        orderBy("timestamp", "desc"),
        startAfter(lastTimestamp),
        limit(numPosts)
      );
    }
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const imgData: FeedPostType = {
        pid: data.pid,
        uid: data.uid,
        username: data.username,
        postText: data.postText,
        isPrivate: data.isPrivate,
        likes: data.likes,
        classification: data.classification,
        path: data.path,
        timestamp: data.timestamp,
        imageUrl: data.imageUrl,
        comments: data.comments,
      };
      posts.push(imgData);
      lastTimestamp = imgData.timestamp;
    });
  }

  return { posts, lastTimestamp };
};

const getExplore = async (
  user: AppUserInterface
)=> {
  const collectionRef = collection(firestore, "posts");
  const q = query(
    collectionRef,
    where("isPrivate", "==", false),
    orderBy("timestamp", "desc")
  );
  const graph: Graph<{ user: AppUserInterface; post: FeedPostInterface }> = new Graph(comparator);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const imgData: FeedPostType = {
      pid: data.pid,
      uid: data.uid,
      username: data.username,
      postText: data.postText,
      isPrivate: data.isPrivate,
      likes: data.likes,
      classification: data.classification,
      path: data.path,
      timestamp: data.timestamp,
      imageUrl: data.imageUrl,
      comments: data.comments,
    };
    graph.addNode({user: user, post: imgData});
  });
  // sort graph data and return posts
  graph.sort();
  const sortedPosts = graph.nodes.map(node => node.data.post);
  // console.log(sortedPosts);
  return { totalPosts: sortedPosts, size: sortedPosts.length };
}

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

const updateProfilePicture = async (
  user: User | null,
  currentFile: File | undefined
) => {
  if (user !== null && currentFile !== undefined) {
    const uid = user.uid;
    const cloudPath = `profile-imgs/${uid}`;
    const uploadRef = ref(storage, cloudPath);
    const userCollection = collection(firestore, "users");
    const userRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      return Promise.reject("User does not exist");
    }
    await deleteObject(uploadRef)
      .then(() => {
        // uploadProfileImg(user, currentFile)
        uploadBytes(uploadRef, currentFile);
        setTimeout(async () => {
          await getDownloadURL(uploadRef).then((url) => {
            const data = docSnap.data();
            setDoc(doc(userCollection, uid), {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              bio: data.bio,
              friends: data.friends,
              likes: data.likes,
              avatarImage: url,
            });
            updateProfile(user, { photoURL: url });
          });
        }, 1200);
      })
      .catch((err) => {
        console.error(err);
      });
  }
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
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        console.error(error);
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
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
      console.error(error);
    });
};

/**
 * @description Deletes a single post
 * @param pid photo post's unique id
 */
const deletePostByPid = async (pid: string) => {
  const post = await getOnePost(pid).catch((error) => {
    console.error(error);
  });
  if (post) {
    const path = post.path;
    await deleteDoc(doc(firestore, "posts", pid));
    const photoRef = ref(storage, path);
    await deleteObject(photoRef).catch((error) => {
      console.error(error);
    });
  }
};

export {
  fabPostCallback,
  getLiveUserPostData,
  getAllPostData,
  getFriendsFeedData,
  getPublicFeedData,
  postComment,
  uploadProfileImg,
  getLivePost,
  getOnePost,
  getFeed,
  // getProfileUrl,
  getExplore,
  getPhotoUrl,
  updateProfilePicture,
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
  updatePublicUrl,
};
