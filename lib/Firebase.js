// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC2TaBbIyP4CTa-zllO9tXs9lXHD_aZHYg",
  authDomain: "team-rivals.firebaseapp.com",
  projectId: "team-rivals",
  storageBucket: "team-rivals.appspot.com",
  messagingSenderId: "852713594343",
  appId: "1:852713594343:web:9563e88f1a361dc4907142",
  measurementId: "G-8W7BQ2VM4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);