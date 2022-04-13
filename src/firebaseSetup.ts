/*
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
// import { getDatabase, connectDatabaseEmulator } from 'firebase/database'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

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

// import { initializeApp } from 'firebase/app'
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

let app;

if (location.hostname === 'localhost') {

  app = firebase.initializeApp({

    apiKey: process.env.REACT_APP_API_KEY,
    databaseURL: 'http://localhost:8080?ns=hoot-umgc',
    authDomain: 'hoot-umgc.firebaseapp.com',
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: 'http://localhost:9199?ns=hoot-umgc',
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID

  })

} else {

  app = firebase.initializeApp({

    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

  })
}


// Firestore DB
// export const app = initializeApp(config)
export const fireStore = firebase.firestore();
// export const fireStore = getFirestore(app)

connectFirestoreEmulator(fireStore, 'localhost', 8080)
// Firebase Auth
export const auth = getAuth(app)
connectAuthEmulator(auth, 'http://localhost:9099?ns=hoot-umgc')
// Cloud Storage
export const cloud = getStorage(app)
export const cloudRef = ref(cloud)
connectStorageEmulator(cloud, 'localhost', 9199)

console.log(firebase.app().options);
