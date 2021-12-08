// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrPme2pSYDtC-FcjaWh7Y9ZXT8Wl6rWVQ",
  authDomain: "authentication-app-fb3de.firebaseapp.com",
  projectId: "authentication-app-fb3de",
  storageBucket: "authentication-app-fb3de.appspot.com",
  messagingSenderId: "357894488286",
  appId: "1:357894488286:web:48b26035edaf6da82dc24f",
  measurementId: "G-18V1086ZLZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

export const db = getFirestore();
