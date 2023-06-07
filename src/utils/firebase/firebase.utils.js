// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = async () => {
  const {user} = await signInWithRedirect(auth,googleProvider);
  console.log({user});

};

//firestore
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation) => {
 
  if(!userAuth) return;

  const userDocRef = doc(db,'users', userAuth.uid); 

  const userSnapshot = await getDoc(userDocRef);
  
  if(!userSnapshot.exists()){

    try {
    
      const { displayName, email } = userAuth;
      const createAt = new Date();

      await setDoc(userDocRef,{
        displayName,
        email,
        createAt,
        ...additionalInformation
      });

    } catch (error) {
      console.error('error create the user', error.message);
    }

  }
  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password)=>{

  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

/*
Observable
onAuthStateChanged(auth, callback, errorCallback, completeCallbacx);
*/