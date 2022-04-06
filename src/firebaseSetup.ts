/*
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
// import { getDatabase, connectDatabaseEmulator } from 'firebase/database'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: 'AIzaSyBIAhYy5jj2uPLJptA7Agj46jdheAv5SuA',
  authDomain: 'hoot-umgc.firebaseapp.com',
  databaseURL: 'https://hoot-umgc-default-rtdb.firebaseio.com',
  projectId: 'hoot-umgc',
  storageBucket: 'hoot-umgc.appspot.com',
  messagingSenderId: '614927815368',
  appId: '1:614927815368:web:add5a55db00e599d790bfd',
  measurementId: 'G-W7J416M731'
};

const app = initializeApp(config);
// auth
const auth = getAuth();
const authEmulator = connectAuthEmulator(auth, 'http://localhost:9099');
// db
// const db = getDatabase();
// const dbEmulator = connectDatabaseEmulator(db, 'localhost', 9000);
// firestore
const fireStore = getFirestore();
const fsEmulator = connectFirestoreEmulator(fireStore, 'localhost', 8080);
// cloud storage
const cloud = getStorage();
const cloudEmulator = connectStorageEmulator(cloud, 'localhost', 9199);

export {
  config,
  app,
  auth,
  authEmulator,
  // db,
  // dbEmulator,
  fireStore,
  fsEmulator,
  cloud,
  cloudEmulator
}
*/
// WORKING CONFIG / INIT

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/storage'
import { connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator, ref } from 'firebase/storage'


// TODO: where is this file ? src/firebaseSetup.ts

/*************************************************
 *
 * Firebase App config
 * checks hostname and initializes with
 * emulator urls if localhost or app .env variables
 * if not (emulator connections need to be removed
 * if not running on localhost)
 *
 ************************************************/

let firebaseApp;

if (location.hostname === 'localhost') {

  firebaseApp = firebase.initializeApp({

    apiKey: 'AIzaSyBIAhYy5jj2uPLJptA7Agj46jdheAv5SuA',
    databaseURL: 'http://localhost:8080?ns=hoot-umgc',
    projectId: 'hoot-umgc',
    storageBucket: 'http://localhost:9199?ns=hoot-umgc',
    messagingSenderId: 'G-W7J416M731'

  })

} else {

  firebaseApp = firebase.initializeApp({

    apiKey:  'AIzaSyBIAhYy5jj2uPLJptA7Agj46jdheAv5SuA',
    authDomain: 'hoot-umgc.firebaseapp.com',
    // databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: 'hoot-umgc',
    storageBucket: 'hoot-umgc.appspot.com',
    messagingSenderId: 'G-W7J416M731'

  })
}


console.log(firebase.app().options);

// Firestore DB
export const fireStore = firebase.firestore()
connectFirestoreEmulator(fireStore, 'localhost', 8080)
// Firebase Auth
export const auth = getAuth()
connectAuthEmulator(auth,'http://localhost:9099?ns=hoot-umgc')
// Cloud Storage
export const cloud = getStorage(firebaseApp)
export const cloudRef = ref(cloud)
connectStorageEmulator(cloud, 'localhost', 9199)

