import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDEJBdmLl_iVfo85BODAwVSkYdgRqqYESo",
  authDomain: "blog-website-001.firebaseapp.com",
  projectId: "blog-website-001",
  storageBucket: "blog-website-001.appspot.com",
  messagingSenderId: "666691635401",
  measurementId: "G-RMHEY1ZQED",
  appId: "1:666691635401:web:5c45c3642288cda3e46518"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;
  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
  return user;
};
