import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyANZuGGwquqbJjXBsWG7b5rp2Tr2PDN3-k",
    authDomain: "registros-tuberculosis-7cf7a.firebaseapp.com",
    projectId: "registros-tuberculosis-7cf7a",
    storageBucket: "registros-tuberculosis-7cf7a.firebasestorage.app",
    messagingSenderId: "656512132328",
    appId: "1:656512132328:web:7365edf48efe6f16be955d",
    measurementId: "G-D52MB7HC4K"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
