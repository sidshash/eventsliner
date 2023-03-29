// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2bBiM9MBrLSWBzRSijCiXgcDZJEFRzl0",
  authDomain: "eventsliner-8c2ec.firebaseapp.com",
  projectId: "eventsliner-8c2ec",
  storageBucket: "eventsliner-8c2ec.appspot.com",
  messagingSenderId: "394570028775",
  appId: "1:394570028775:web:a4c4eec12b07a0ce6ab442",
  measurementId: "G-MXLTRQ97Y4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);;

export default storage;