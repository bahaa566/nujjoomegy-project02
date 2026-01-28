
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/**
 * PRODUCTION SETUP INSTRUCTIONS:
 * 1. Replace placeholder values below with your actual Firebase Project Settings.
 * 2. IMPORTANT: In the Firebase Console (Authentication > Settings > Authorized Domains), 
 *    you MUST add "nujjoomegy.com" to the list to allow Firestore/Auth requests.
 */
const firebaseConfig = {
  apiKey: "AIzaSy...", // Replace with real key
  authDomain: "nujoomegy.firebaseapp.com",
  projectId: "nujoomegy",
  storageBucket: "nujoomegy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
