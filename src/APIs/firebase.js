import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import "firebase/firestore"
import { getFirestore } from 'firebase/firestore';

const firebaseConf =
{                     
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConf);

export const auth = getAuth(app);
export const store = getFirestore(app);
export default app