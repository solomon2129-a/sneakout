import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBQgcex8JQEjRl7WXblYOFykVMyG3eDr1I",
  authDomain: "sneakout-landing-page.firebaseapp.com",
  projectId: "sneakout-landing-page",
  storageBucket: "sneakout-landing-page.firebasestorage.app",
  messagingSenderId: "874218848951",
  appId: "1:874218848951:web:1e10af92d566b5a1480332",
  measurementId: "G-471R3267X7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize analytics only in browser
if (typeof window !== 'undefined') {
  try {
    getAnalytics(app);
  } catch (e) {
    // Analytics might fail in some environments
  }
}

export default app;
