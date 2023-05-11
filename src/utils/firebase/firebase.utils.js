// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth';


// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4hEgZoUM83q1c6kKZ11GtKrnQaHTQNHE",
  authDomain: "crwn-clothing-db-8963b.firebaseapp.com",
  projectId: "crwn-clothing-db-8963b",
  storageBucket: "crwn-clothing-db-8963b.appspot.com",
  messagingSenderId: "74221468974",
  appId: "1:74221468974:web:5222732880070110934ebf",
  measurementId: "G-B83MHD5CVB"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);