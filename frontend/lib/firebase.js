import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzsxzETtbMWLFzucnb4j1LbQGBddlgn6s",
  authDomain: "wateraudit-f40e0.firebaseapp.com",
  projectId: "wateraudit-f40e0",
  storageBucket: "wateraudit-f40e0.firebasestorage.app",
  messagingSenderId: "582543412426",
  appId: "1:582543412426:web:cdcaf0dde8e2ca8c7d7833",
  measurementId: "G-VH42QY34M6"
};

// Initialize Firebase (check if already initialized to avoid SSR issues)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
