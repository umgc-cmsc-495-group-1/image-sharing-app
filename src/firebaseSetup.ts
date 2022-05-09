// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from "firebase/auth"; //
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"; //
import { getDatabase, connectDatabaseEmulator } from "firebase/database"; //
import { getStorage, connectStorageEmulator } from "firebase/storage"; //
import { initializeAppCheck, ReCaptchaV3Provider} from 'firebase/app-check'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIAhYy5jj2uPLJptA7Agj46jdheAv5SuA",
  authDomain: "hoot-umgc.firebaseapp.com",
  databaseURL: "https://hoot-umgc-default-rtdb.firebaseio.com",
  projectId: "hoot-umgc",
  storageBucket: "hoot-umgc.appspot.com",
  messagingSenderId: "614927815368",
  appId: "1:614927815368:web:add5a55db00e599d790bfd",
  measurementId: "G-W7J416M731"
};

firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebase.getApp());
const firestore = getFirestore(firebase.getApp());
const database = getDatabase(firebase.getApp());
const storage = getStorage(firebase.getApp());
// check for production environment
if (window.location.hostname === 'localhost') {
  // connect to emulator
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(firestore, "localhost", 8080);
  connectDatabaseEmulator(database, "localhost", 9000);
  connectStorageEmulator(storage, "localhost", 9199);
} else {
  // ensure recaptcha is loaded
  initializeAppCheck(firebase.getApp(), {
    provider: new ReCaptchaV3Provider("6LfKDRYfAAAAAGNtdfAu0kC96veCgowKHPXareRL"),
    isTokenAutoRefreshEnabled: true
  });
  // connect application analytics
  getAnalytics(firebase.getApp());
}

export {
  firebase,
  auth,
  firestore,
  database,
  storage
}
