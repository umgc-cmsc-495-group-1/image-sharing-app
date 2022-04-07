import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/storage'
import { connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator, ref } from 'firebase/storage'

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

		apiKey: process.env.REACT_APP_API_KEY,
		databaseURL: 'http://localhost:8080?ns=hoot-umgc',
		projectId: process.env.REACT_APP_PROJECT_ID,
		storageBucket: 'http://localhost:9199?ns=hoot-umgc',
		messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID

	})

} else {

	firebaseApp = firebase.initializeApp({

		apiKey: process.env.REACT_APP_API_KEY,
		authDomain: process.env.REACT_APP_AUTH_DOMAIN,
		databaseURL: process.env.REACT_APP_DATABASE_URL,
		projectId: process.env.REACT_APP_PROJECT_ID,
		storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
		messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

	})
}

// Firestore DB
export const fireStore = firebase.firestore()
connectFirestoreEmulator(fireStore, 'localhost', 8080)
// Firebase Auth
export const auth = getAuth()
connectAuthEmulator(auth, 'http://localhost:9099?ns=hoot-umgc')
// Cloud Storage
export const cloud = getStorage(firebaseApp)
export const cloudRef = ref(cloud)
connectStorageEmulator(cloud, 'localhost', 9199)