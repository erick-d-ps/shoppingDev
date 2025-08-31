
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDm7GBSDLZjA8x-2P-cahHMMK-i9vpcq0",
  authDomain: "shopppingdev.firebaseapp.com",
  projectId: "shopppingdev",
  storageBucket: "shopppingdev.firebasestorage.app",
  messagingSenderId: "408809069135",
  appId: "1:408809069135:web:2e2a44b310c8803243683a"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)

export {db, auth}



