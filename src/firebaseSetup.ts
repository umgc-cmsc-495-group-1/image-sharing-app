// import { initializeApp } from 'firebase/app'
// import firebase from 'firebase/compat/app'
// import 'firebase/compat/firestore'
// import 'firebase/storage'
import { initializeApp } from '@firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

const app = initializeApp({
  apiKey: "AIzaSyBIAhYy5jj2uPLJptA7Agj46jdheAv5SuA",
  authDomain: "hoot-umgc.firebaseapp.com",
  databaseURL: "https://hoot-umgc-default-rtdb.firebaseio.com",
  projectId: "hoot-umgc",
  storageBucket: "hoot-umgc.appspot.com",
  messagingSenderId: "614927815368",
  appId: "1:614927815368:web:add5a55db00e599d790bfd",
  measurementId: "G-W7J416M731"
});
// auth
const auth = getAuth();
const authEmulator = connectAuthEmulator(auth, 'http://localhost:9099');
// db
const db = getDatabase();
const dbEmulator = connectDatabaseEmulator(db, 'localhost', 9000);
// firestore
const fireStore = getFirestore();
const fsEmulator = connectFirestoreEmulator(fireStore, 'localhost', 8080);
// cloud storage
const cloud = getStorage();
const cloudEmulator = connectStorageEmulator(cloud, 'localhost', 9199);

export {
  app,
  auth,
  authEmulator,
  db,
  dbEmulator,
  fireStore,
  fsEmulator,
  cloud,
  cloudEmulator
}
