import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDEJBdmLl_iVfo85BODAwVSkYdgRqqYESo',
  authDomain: 'blog-website-001.firebaseapp.com',
  projectId: 'blog-website-001',
  storageBucket: 'blog-website-001.appspot.com', // Corrected storageBucket
  messagingSenderId: '666691635401',
  appId: '1:666691635401:web:5c45c3642288cda3e46518',
  measurementId: 'G-RMHEY1ZQED',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Auth
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const authWithGoogle = async () => {
  let user = null;
  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
  }
  return user;
};

// import { GoogleAuthProvider, getAuth } from 'firebase/auth';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDEJBdmLl_iVfo85BODAwVSkYdgRqqYESo',
//   authDomain: 'blog-website-001.firebaseapp.com',
//   projectId: 'blog-website-001',
//   storageBucket: 'blog-website-001.firebasestorage.app',
//   messagingSenderId: '666691635401',
//   appId: '1:666691635401:web:5c45c3642288cda3e46518',
//   measurementId: 'G-RMHEY1ZQED',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// //* * * * * *
// const provider = new GoogleAuthProvider();
// const auth = getAuth();

// export const authWithGoogle = async () => {
//   let user = null;
//   try {
//     user = await auth.signInWithPopup(auth, provider);
//   } catch (error) {
//     console.error(error);
//   }
//   return user;
// };
