import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"; 

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
//     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId:import.meta.env.VITE_FIREBASE_MESAGING_SENDER_ID,
//     appId: import.meta.env.APP_ID
//   };

const firebaseConfig = {
  apiKey: "AIzaSyBKEYdMkTDf8jUjwWh6MRjeHrbpuHbJDSU",
  authDomain: "movie-5af98.firebaseapp.com",
  projectId: "movie-5af98",
  storageBucket: "movie-5af98.appspot.com",
  messagingSenderId: "5226930876",
  appId: "1:5226930876:web:b5d531e12e3cf06bb126b9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
