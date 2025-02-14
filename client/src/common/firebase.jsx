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
const auth = getAuth(app);

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

// // ✅ Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// // ✅ Initialize Analytics (Only If Supported)
// // if (typeof window !== "undefined") {
// //   isSupported().then((supported) => {
// //     if (supported) getAnalytics(app);
// //   });
// // }

// // ✅ Google Authentication Function
// export const authWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     return result.user; // Return user data if successful
//   } catch (error) {
//     console.error("Google Sign-in Error:", error.message);
//   }
// };

// // ✅ Export Authentication
// export { auth, provider };
