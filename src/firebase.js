import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5eIvO3rk55FyyjaOZaBfYpkcuEHmmOkI",
  authDomain: "portfolio-web-7dc1d.firebaseapp.com",
  projectId: "portfolio-web-7dc1d",
  storageBucket: "portfolio-web-7dc1d.firebasestorage.app",
  messagingSenderId: "524248137740",
  appId: "1:524248137740:web:0508a75e36b18d91946e29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;