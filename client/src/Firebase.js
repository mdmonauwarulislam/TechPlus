// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tech-plus-8421e.firebaseapp.com",
  projectId: "tech-plus-8421e",
  storageBucket: "tech-plus-8421e.appspot.com",
  messagingSenderId: "584008567041",
  appId: "1:584008567041:web:329c8e2ef7f1cbe4b27300"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);