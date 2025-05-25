// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBS9NQsO4tKOY4B4zfHgOYET_e5dzjfII8",
  authDomain: "media-utils-17063.firebaseapp.com",
  projectId: "media-utils-17063",
  storageBucket: "media-utils-17063.appspot.com",
  messagingSenderId: "900338598363",
  appId: "1:900338598363:web:281c5aaa77c307eb95a7fe",
  measurementId: "G-997GFVQ544",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Failed to set persistence:", error);
});
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup };
