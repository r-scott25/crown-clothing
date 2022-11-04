import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-hogazIkGQDtRd0oUM-DVei_ia29nM7c",
  authDomain: "crown-clothing-db-4d37c.firebaseapp.com",
  projectId: "crown-clothing-db-4d37c",
  storageBucket: "crown-clothing-db-4d37c.appspot.com",
  messagingSenderId: "976387746831",
  appId: "1:976387746831:web:499acdbef4310157e1477a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  //  Check if user data exists //
  // If user data does not exist:
  //      Create / set the document with the data from the userAuth (userSnapShot) in my collection
  // If it does exist:
  //      Return userDocRef
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  } else {
    return userDocRef;
  }
};
