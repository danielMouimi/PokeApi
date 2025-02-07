// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaV_JGFpKO_oeBiMJMjcWuAAmOVeI5cj8",
  authDomain: "pkapireact.firebaseapp.com",
  projectId: "pkapireact",
  storageBucket: "pkapireact.firebasestorage.app",
  messagingSenderId: "949244559512",
  appId: "1:949244559512:web:89aa9b7f59171d188a10ed",
  measurementId: "G-RX26R0YYRL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

export {auth};
export {db};

