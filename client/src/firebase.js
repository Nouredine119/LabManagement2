// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
  authDomain: "mern-73e2b.firebaseapp.com",
  projectId: "mern-73e2b",
  storageBucket: "mern-73e2b.appspot.com",
  messagingSenderId: "1051211205922",
  appId: "1:1051211205922:web:e89d4050d70353ee53e97b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);