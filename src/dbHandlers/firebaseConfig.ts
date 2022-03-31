//import firebase from "firebase/compat/app";
//import "firebase/compat/firestore";
//import "firebase/storage";
//import { getAuth } from 'firebase/auth';
//import { getStorage, ref } from "firebase/storage";
//import { getFirestore } from "firebase/firestore";

/*************************************************
 * Firebase App config and initialization for
 * actual databases
 ************************************************/

export {}
/* For initializing firestore app and getting sdk s replace values in .env file
if used */

// Import the functions you need from the SDKs you need

//import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
/*
const firebaseApp = firebase.initializeApp({

  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

});


// Initialize Firebase

//console.log(firebase.app().options);

export const firestore = firebase.firestore();
//export const storage = firebase.storage();
export const storage = getStorage(firebaseApp);
export const storageRef = ref(storage);
export const auth = getAuth();
*/