// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJaAqwesPUg4fkt0iBKW1dm8UXPWzcuO4",
  authDomain: "yumnums-b052a.firebaseapp.com",
  projectId: "yumnums-b052a",
  storageBucket: "yumnums-b052a.firebasestorage.app",
  messagingSenderId: "994224366854",
  appId: "1:994224366854:web:708cb19ce5a61f4fbb6a87",
  measurementId: "G-QWG5LTE30W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);