import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-course-generator-c1892.firebaseapp.com",
  projectId: "ai-course-generator-c1892",
  storageBucket: "ai-course-generator-c1892.appspot.com",
  messagingSenderId: "693776197367",
  appId: "1:693776197367:web:1337b6fec7eaff9ffc15f2",
  measurementId: "G-YSDPEMFPEC",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
