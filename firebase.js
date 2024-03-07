// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYtCHLDe8Ez4tH07Z2TWgMz1J6DDWPyvU",
  authDomain: "mobileproject-87145.firebaseapp.com",
  projectId: "mobileproject-87145",
  storageBucket: "mobileproject-87145.appspot.com",
  messagingSenderId: "671146368201",
  appId: "1:671146368201:web:a935399dab272aa5cdc118"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);

export {app, database, storage}