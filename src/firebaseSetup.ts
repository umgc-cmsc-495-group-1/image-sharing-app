import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPLICATION_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(config);
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
  config,
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
