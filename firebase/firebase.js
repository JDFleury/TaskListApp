// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { KEYS } from "../keys";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: KEYS.FIREBASE_API,
    authDomain: "task-list-application.firebaseapp.com",
    projectId: "task-list-application",
    storageBucket: "task-list-application.appspot.com",
    messagingSenderId: "906645578462",
    appId: "1:906645578462:web:a2f710ca8340e99f6e584f",
    measurementId: "G-QY3YXG8XYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
