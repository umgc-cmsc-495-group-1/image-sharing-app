import 'firebase/storage';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { cloud, auth, fireStore } from '../firebaseSetup';
import { v4 as uuidv4 } from 'uuid';
import { setDoc, doc, getDoc, collection, updateDoc, getDocs, query, orderBy } from "firebase/firestore";
import { serverTimestamp } from 'firebase/firestore';
import { ImgData, photoData } from './interfaces';
// import { setDoc, doc, getDoc, collection, getDocs } from "firebase/firestore";

// need to npm install uuid to create unique filepath for photos
// & npm install -D @types/uuid or npm i --save-dev @types/uuid
// Usage: uuidv4(); returns uid string


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
 * @param photoFile File with extension .png, .jpeg, or .jpg
 * @param tags string[] optional contains any photo tags
 * @param caption string optional photo caption
 */
export const postNewImage = async (photoFile: File, tags: string[], caption: string) => {
  // Get UID of current user if it exists
  const userId = auth.currentUser?.uid;
  // Create a new UID for the photo
  const imgUid = uuidv4();
  // get ext from file let extension = filename.split(".").pop();
  // const ext = photoFile.name.split(".").pop();
  const cloudPath = `photos/${userId}/${imgUid}/${photoFile.name}`;  // decide on path
  // Get reference to subcollection path
  // (photos collection->doc w/userId key->posts collection->post data doc)
  const firestorePath = `photos/${userId}/posts/${imgUid}`;
  const firestoreRef = doc(fireStore, firestorePath);
  if (userId) {
    // Post related data to save to firestore collection

    const newImgData: photoData = {
      photoId: imgUid,
      userId: userId,
      imgName: photoFile.name || "",
      caption: caption || "",
      path: cloudPath,
      // url: "",
      tags: tags || [],
      numberLikes: 0,
      comments: [],
      timestamp: serverTimestamp()
    }
    // Write to firestore db
    try {
      // set document data
      await uploadImageFile(photoFile, cloudPath);
      // newImgData.imgURL = url || cloudPath;
      await setDoc(firestoreRef, newImgData);
      // setting url only works about 1/2 the time. Need to
      // retrieve using path in useEffect in a photo component
      // await updatePublicUrl(firestorePath, cloudPath);
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 *  Save image file (.png, .jpg) to Cloud Storage path
 * @param file : File image file
 * @param path : cloud storage file path
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
      // Upload completed successfully, now can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        return downloadURL;
      });
    }
  );
}

/**
 * Get URL for profile image
 * @param userId
 * @returns profile photo url: Promise<string>
 */
export const getProfileUrl = async (userId: string) => {
  const filePath = `profile-imgs/${userId}/profile-image`;
  const fileRef = ref(cloud, filePath);
  console.log("url: ", getDownloadURL(fileRef));
  return await getDownloadURL(fileRef);
};

/**
 * Get Photo data from firestore
 * @param imgId
 * @returns : photo data doc: Promise<photoData | undefined>
 */
export const getOnePhoto = async (imgId: string, userId: string) => { // may have to rethink having userID in path?

  const imgRef = doc(fireStore, "photos", userId, "posts", imgId);
  const docSnap = await getDoc(imgRef)

  if (!docSnap.exists()) {
    console.log('No photo document found')
    return
  }
  const data = docSnap.data();
  const imgData: photoData = {
    photoId: imgId, // make both ids user id for profile?
    userId: data.userId,
    imgName: data.imgName,
    caption: data.caption || "",
    numberLikes: data.numberLikes,
    comments: data.comments,
    path: data.path,
    timestamp: data.timestamp,
    tags: data.tags
    // url: data.url
  }
  // const url = await getPhotoUrl(imgData.path);
  console.log('post data: ', JSON.stringify(imgData));

  return imgData;
}

// export const getAllUserPhotos = async (userId: string) => {

// const data = await getAllUserPhotoData(userId);
// loop through each doc and save to list update Urls?
// const fileRef = ref(cloud, url);
// return await getDownloadURL(fileRef);
// }

/**
 * Get all of user's photo data docs from firebase
 * @param userId : string
 * @returns
 */

export const getAllUserPhotoData = async (userId: string) => {

  let userPhotos: photoData[];
  // doc(fireStore, "photos", userId, "posts", imgUid);
  const collectionRef = collection(fireStore, "photos", userId, "posts");
  const q = query(collectionRef, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    // const url = getPhotoUrl(data.imgUrl);

      const imgData: photoData = {
      photoId: data.imgId, // make both ids user id for profile?
      userId: data.userId,
      imgName: data.imgName,
      caption: data.caption || "",
      numberLikes: data.numberLikes,
      comments: data.comments,
      path: data.path
    };
    userPhotos.push(imgData);
  });
  // return userPhotos;
}

/**
 * Supposed to get url of photo for setting img tag src
 *
 * @param data : photoData object
 *
 * @returns
 */
/*
export const getPhotoUrl = async (data: photoData) => {
  const path = data.path;
  const fileRef = ref(cloud, path);
  return await getDownloadURL(fileRef);
};
*/
/*
// another exapmle of getting url
getDownloadURL(ref(cloud, path))
  .then((url) => {
    // `url` is the download URL for 'images/stars.jpg'

    // This can be downloaded directly:
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open('GET', url);
    xhr.send();

    // Or inserted into an <img> element
    const img = document.getElementById('myimg');
    img.setAttribute('src', url);
  })
  .catch((error) => {
    // Handle any errors
  });


export const getPhotoUrl = async (path: string) => {
  const fileRef = ref(cloud, path);
  return await getDownloadURL(fileRef);
};
*/

/**
 * Update photo timestamp
 * @param path
 */
export const setTimestamp = async (path: string) => {
  const docRef = doc(fireStore, path);

  // Update the timestamp field with the value from the server
  await updateDoc(docRef, {
    timestamp: serverTimestamp()
  });
}
/*
// This worked half of the time because it has timing issues
const updatePublicUrl = async (docPath: string , filePath: string) => {
  try {
    const fileRef = ref(cloud, filePath);
    const docRef = doc(fireStore, docPath);
    await getDownloadURL(fileRef).then((url) => {
      setDoc(docRef, {
        url: url
      }, { merge: true });
      console.log(url);
    }) ;

  } catch (error) {
    console.error('There was an error uploading a file to Cloud Storage:', error);
  }
}
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

// add to an array v9
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Atomically add a new region to the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayUnion("greater_virginia")
});

// Atomically remove a region from the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayRemove("east_coast")
});

//increment number value
import { doc, updateDoc, increment } from "firebase/firestore";

const washingtonRef = doc(db, "cities", "DC");

// Atomically increment the population of the city by 50.
await updateDoc(washingtonRef, {
    population: increment(50)
});
*/

// Firestore data converter
const photoConverter = {
  toFirestore: (imgData: ImgData) => {
    return {
      photoId: imgData.photoId,
      userId: imgData.userId,
      imgName: imgData.imgName,
      caption: imgData.caption || "",
      numberLikes: 0,
      path: imgData.path,
      url: "",
      tags: imgData.tags || [],
      comments: [],
      timestamp: serverTimestamp()
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new ImgData(data);
  }
}
export const getImgData = async (userId: string) => {
  const firestorePath = `photos/${userId}/posts/`;

  const ref = doc(fireStore, firestorePath).withConverter(photoConverter);
  let imgData: ImgData;
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    // Convert to City object
    imgData = docSnap.data();
    return imgData;
    // Use a City instance method
  } else {
    console.log("No such document!");
  }
  return null;
}