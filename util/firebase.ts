// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"
require('dotenv').config()

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "levarne-office-backend.firebaseapp.com",
  projectId: "levarne-office-backend",
  storageBucket: "levarne-office-backend.appspot.com",
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId:  process.env.APP_ID
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase)

module.exports = { firebase, db }