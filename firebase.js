// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  serverTimestamp,
  addDoc,
  collection,
  getDoc,
  doc,
} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDJ4n-Et3amMClW2PrGp5LoZpLC47uAeA",
  authDomain: "insta-clone-bf984.firebaseapp.com",
  projectId: "insta-clone-bf984",
  storageBucket: "insta-clone-bf984.appspot.com",
  messagingSenderId: "1083178643218",
  appId: "1:1083178643218:web:22bad1790d9e469b79cdcb",
  measurementId: "G-8WMZ5MHZVZ",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

/// ADD NEW USER IN DATABASE
export const createUserProfileDocument = async (userAuthObject) => {
  return userAuthObject;
};

export { app, db, storage };
