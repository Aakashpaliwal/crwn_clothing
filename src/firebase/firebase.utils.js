// Import the functions you need from the SDKs you need
// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
// import "firebase/auth";
// import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-oXWODhEqxO7gtIpyuU2aSBFqNuDEP9k",
  authDomain: "crwn-db-928e7.firebaseapp.com",
  projectId: "crwn-db-928e7",
  storageBucket: "crwn-db-928e7.appspot.com",
  messagingSenderId: "680752671843",
  appId: "1:680752671843:web:85f5f30f215426837e5c56",
  measurementId: "G-836YHRJ91N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log("app", app);
export const auth = getAuth(app);
console.log("auth", auth);
export const db = getFirestore();
// export const firestore = app.firestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  console.log("userAuth", userAuth);

  const userDoc = doc(db, `users/${userAuth.uid}`);
  const snapshot = await getDoc(userDoc);
  console.log("snapshot", snapshot);
  if (!snapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDoc, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return getDoc(userDoc);

  // const docRef = await getDocs(collection(db, "users", userAuth.uid));
  // console.log(
  //   "docRef",
  //   docRef.docs.map((doc) => doc.data())
  // );

  // const noteSnapshot = await getDoc(doc(db, "users", userAuth.uid));
  // console.log("notesnapshot", noteSnapshot, noteSnapshot.exists());
  // if (!noteSnapshot.exists()) {
  //   const { displayName, email } = userAuth;
  //   const createdAt = new Date();
  //   try {
  //     await setDoc(doc(db, "users", userAuth.uid), {
  //       displayName,
  //       email,
  //       createdAt,
  //       ...additionalData,
  //     });
  //   } catch (error) {
  //     console.log("error creating user", error.message);
  //   }
  // }
  // return getDoc(doc(db, "users", userAuth.uid));

  // if (noteSnapshot.exists()) {
  //   console.log(noteSnapshot.data());
  // } else {
  //   console.log("Note doesn't exist");
  // }
};

export default firebase;
