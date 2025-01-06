// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0TFlfK35_1zR5PaYbJgBM1JvpqBb-F1Y",
  authDomain: "auth-otp-8375d.firebaseapp.com",
  projectId: "auth-otp-8375d",
  storageBucket: "auth-otp-8375d.firebasestorage.app",
  messagingSenderId: "900465914580",
  appId: "1:900465914580:web:a789aff544a13321e8c141",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

auth.useDeviceLanguage();

export { auth };
