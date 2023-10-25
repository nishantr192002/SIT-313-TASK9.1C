
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADvxzDuKt7NwkCmUAQC2loHL9fgFrvy3Y",
  authDomain: "sit-313task7-1p.firebaseapp.com",
  databaseURL: "https://sit-313task7-1p-default-rtdb.firebaseio.com",
  projectId: "sit-313task7-1p",
  storageBucket: "sit-313task7-1p.appspot.com",
  messagingSenderId: "629963976858",
  appId: "1:629963976858:web:0faa688458c32be5f8af23",
  measurementId: "G-0CCP8YF9FZ"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
prompt:"select_account"
});

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth || !userAuth.email) {
      console.error('Invalid userAuth object:', userAuth);
      return null;
    }
  
    const userDocRef = doc(db,"users", userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
    console.log(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
        console.log('User document created in Firestore');
      } catch (error) {
        console.log('Error creating user document:', error.message);
      }
    }
  
    return userDocRef;
  };
  

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  };